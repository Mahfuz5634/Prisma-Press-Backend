import { error } from "node:console";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken"
import { ref } from "node:process";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser=async (playload:ILoginUser)=>{
     
      const {email,password}=playload;

      const user = await prisma.user.findFirstOrThrow({
        where:{email}
      })


       const isPasswordMatched= await bcrypt.compare(password,user.password)

       if(!isPasswordMatched){
        throw new Error("Password is incorrect");
       }
        
       const  jwtPaylod={ 
         id:user.id,
         email:user.email

       }
       const accessToken = jwtUtils.createToken(jwtPaylod,config.jwt_access_secret!,{
        expiresIn:"1d"
       })

       const refreshToken = jwt.sign(jwtPaylod,"secret5key",{
        expiresIn:"7d"
       })

       return {
         user,
         accessToken,
         refreshToken
       };
    }

   



export const authService={
    loginUser
}