export type LoginType = {
  email: string;
  password: string;
};

export type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'BARBER' | 'CLIENT';
};
