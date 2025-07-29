import { setCookie, getCookie, deleteCookie } from "cookies-next";

const COOKIE_NAME = "aadminToken";

export const saveAdminToken = (token: string) => {
  setCookie(COOKIE_NAME, token, {
    maxAge: 60 * 60 * 24, // یک روز
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const removeAdminToken = () => {
  deleteCookie(COOKIE_NAME, { path: "/" });
};

export const getAdminToken = () => {
  const token = getCookie(COOKIE_NAME);
  return typeof token === "string" ? token : null;
};
