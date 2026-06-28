import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcrypt";
import { RegisterUserPlayload } from "./user.interface";


const registeUserIntoDb=async (playload:RegisterUserPlayload)=>{
     const {name,email,password,profilePhoto}=playload
 const isUserExist= await prisma.user.findUnique({
       where:{email}
    })
    if(isUserExist){
        throw new Error("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password,Number(config.bycrypt_salt_rounds))

    const createdUser=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

     await prisma.profile.create({
        data:{
            userId: createdUser.id,
            profilePhoto
        }
    })
   
    const user=await prisma.user.findUnique({
        where:{
            id:createdUser.id,
            email:createdUser.email

        },
        omit:{
            password:true
        },
        include:{
            profileId:true
        }
    })
    return user;
}

const getMyProfileFromDB=async(userId:string)=>{
   
    const user= await prisma.user.findFirstOrThrow({
        where:{id:userId},
        omit:{
            password:true
        },
        include:{
            profileId:true
        }
    });
    return user;
}

export const userService ={
    registeUserIntoDb,
    getMyProfileFromDB
}