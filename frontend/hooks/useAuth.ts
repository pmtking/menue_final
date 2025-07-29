'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import api from '@/libs/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// types
interface User {
  id: number;
  name: string;
  email: string;
}

 export interface Credentials {
  number: string;
  password: string;
  role:"ADMIN" | "USER"
}

interface RegisterData extends Credentials {
  name: string;
}

const COOKIE_NAME = 'userToken';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate(); // تعریف شده

  // گرفتن user از توکن در کوکی
  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie(COOKIE_NAME);
      if (!token) return;

      try {
        setLoading(true);
        const res = await api.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err: any) {
        console.error('USER FETCH ERROR:', err);
        setUser(null);
        deleteCookie(COOKIE_NAME);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ثبت‌نام
  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const res = await api.post('/api/auth/register', data);
      console.log( '------------>', res);
      const token = res.data.data.token;

      setCookie(COOKIE_NAME, token, {
        maxAge: 60 * 60 * 24, // 1 روز
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });

      setUser(res.data.user);
      toast.success('ثبت‌نام موفقیت‌آمیز بود');
     location.replace('/admin')
    } catch (err: any) {
      console.error('REGISTER ERROR:', err);
      setError(err.message);
      toast.error(err.message || 'خطا در ثبت‌نام');
    } finally {
      setLoading(false);
    }
  };

  // ورود
  const login = async (data: Credentials) => {
    try {
      setLoading(true);
      const res = await api.post('/api/auth/login', data);
      const token = res.data.token;

      setCookie(COOKIE_NAME, token, {
        maxAge: 60 * 60 * 24,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });

      setUser(res.data.user);
      toast.success('ورود موفقیت‌آمیز بود');
      if(data.role === 'ADMIN') {
        location.replace('/admin')
      }else{
        location.replace('/')
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  // خروج
  const logout = () => {
    deleteCookie(COOKIE_NAME);
    setUser(null);
    toast.success('با موفقیت خارج شدید');
  };

  return {
    loading,
    error,
    user,
    register,
    login,
    logout,
    
    isAuthenticated: !!user,
  };
};

export default useAuth;
