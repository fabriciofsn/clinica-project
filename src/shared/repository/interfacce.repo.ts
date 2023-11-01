interface IRecover<T>{
  recoverByID(UUID: string): Promise<T | null>;
  recoverAll(): Promise<Array<T>>;
  exist(UUID: string): Promise<boolean>;
}

interface ISetter<T>{
  insert(entity: T): Promise<boolean>;
  update(UUID: string, entity: T): Promise<boolean>;
  delete(UUID: string): Promise<boolean>;
}

export interface IRespository<T> extends IRecover<T>, ISetter<T> {};
