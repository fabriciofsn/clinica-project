import { userDB } from "@modules/database/schema";
import { userRepository } from "./repository/repository.interface.user";
import {hash, compare} from 'bcrypt';
import { AuthService } from "./authService/AuthService";

export class User implements userRepository<User>{

  async login(email: string, password: string): Promise<string | boolean> {
    const user = await userDB.findOne({email:email});
    if(!user) throw new Error('User Not Found');

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) throw new Error('Incorrect Password');

    const token = AuthService.gererateToken({email: user.email});
    return token;
  }

  async insert(email: string, pass: string): Promise<boolean> {
    const password = await hash(pass, 10);
    const userDb = await userDB.create({email,password}); 
    if(userDb) return true;
    return false;
  }
  async recoverByEmail(email: string): Promise<{}> {
    const userEmail = await userDB.findOne({email: email});
    return {
      id: userEmail?.id,
      email: userEmail?.email,
    }
  }
}

export const userLogin = new User().login;
