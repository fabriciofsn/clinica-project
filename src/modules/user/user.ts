import { userDB } from "@modules/database/schema";
import { userRepository } from "./repository/repository.interface.user";
import {hash, compare} from 'bcrypt';

export class User implements userRepository<User>{

  async login(email: string, password: string): Promise<boolean> {
    const user = await userDB.findOne({email:email});

    if(!user) return false;

     const passwordMatch = await compare(password, user.password);

    return passwordMatch;
  }

  async insert(email: string, pass: string): Promise<boolean> {
    const password = await hash(pass, 10);
    const userDb = await userDB.create({email,password}); 
    if(userDb) return true;
    return false;
  }
  recoverByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}