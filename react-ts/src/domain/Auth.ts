export type Auth = {
  login(email: string, password: string): Promise<string>;
};
