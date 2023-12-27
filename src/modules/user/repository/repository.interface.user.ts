export interface userRepository<T>{
  insert(email: string, password: string): Promise<boolean>;
  login(email: string, password: string): Promise<boolean>;
  recoverByEmail(email: string): Promise<T>;
}