// src/lib/auth.ts
// Hardcoded credentials for admin login

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "password123"
};

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}
