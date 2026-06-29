import { error } from "node:console";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
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


const refreshToken = async (refreshToken: string) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, "secret5key");
  console.log(verifiedRefreshToken);

 const {id}=verifiedRefreshToken as JwtPayload;

 const user = await prisma.user.findFirstOrThrow({
  where:{
    id:id
  }
 })
   if(user.activeStatus==="BLOCKED"){
    throw new Error("User is blocked");
   }
   const jwtPaylod={
    id,
    email:user.email
   }
   const accessToken =  jwtUtils.createToken(jwtPaylod,config.jwt_access_secret!,{
    expiresIn:'1d'
   })
   return {accessToken};
};



export const authService={
    loginUser,
    refreshToken
}