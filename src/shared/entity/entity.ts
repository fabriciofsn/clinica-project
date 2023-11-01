import {randomUUID} from 'crypto';

export class Entity<T>{
 private _id: string;
  
 
 public get id(): string {
    return this._id;
  }
  private set id(value: string) {
    this._id = value;
  }

  constructor(id?: string){
    this.id = id ? id : randomUUID();
  }
}