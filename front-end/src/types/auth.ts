export type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CLIENT';
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
};
