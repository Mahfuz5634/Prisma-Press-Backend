import { error } from "node:console";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import bcrypt from "bcrypt";

const loginUser=async (playload:ILoginUser)=>{
     
      const {email,password}=playload;

      const user = await prisma.user.findFirstOrThrow({
        where:{email}
      })


       const isPasswordMatched= await bcrypt.compare(password,user.password)

       if(!isPasswordMatched){
        throw new Error("Password is incorrect");
       }

       return user;
    }

   



export const authService={
    loginUser
}