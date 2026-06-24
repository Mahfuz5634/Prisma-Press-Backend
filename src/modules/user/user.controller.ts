import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import config from "../../config";
import  HttpStatus  from "http-status";
import bcrypt from "bcrypt";
import { userService } from "./user.service";


const registerUser= async(req:Request,res:Response)=>{
   try {
    const playload=req.body;

   const user = await userService.registeUserIntoDb(playload);
   
    res.status(HttpStatus.CREATED).json({
        success:true,
        statusCode:HttpStatus.CREATED,
        message:"user crated succesfully",
        data:{
            user
        }
    });
   } catch (error) {
    console.log(error);
   }
}

export const userController={
    registerUser
}