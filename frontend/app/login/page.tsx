"use client";

import Button from "@/components/Button/page";
import Header from "@/components/header/page";
import Input from "@/components/Input/page";
import useAuth, { Credentials } from "@/hooks/useAuth";
import React, { useState } from "react";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loading  } = useAuth();
  const handleLogin = () => {
    const credentials: Credentials = {
      number:phoneNumber,
      password,
      role:"ADMIN"
    };

    login(credentials);
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 px-10 py-10 border rounded-2xl">
        <Header size="" text="ورود" />
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          <Input
            placeholder="شماره تلفن"
            type="text"
            className="border rounded-2xl border-gray-500 w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            placeholder="رمز عبور"
            type="text"
            className="border rounded-2xl border-gray-500 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="button" name="ورود" onClick={handleLogin} />
        </div>
      </div>
    </main>
  );
};

export default Login;
