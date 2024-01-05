export interface userRepository<T>{
  insert(email: string, password: string): Promise<boolean>;
  login(email: string, password: string): Promise<string | boolean>;
  recoverByEmail(email: string): Promise<{}>;
}