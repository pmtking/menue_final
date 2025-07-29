export interface RegisterType {
  number?: string;
  role?: "USER" | "ADMIN";
  password?: string;
}

export interface LoginType {
  number?: string;
  role?: "USER" | "ADMIN";
  password?: string;
}
