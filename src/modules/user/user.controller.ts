import { prisma } from "../../lib/prisma";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import  HttpStatus  from "http-status";
import bcrypt from "bcrypt";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";


const registerUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registeUserIntoDb(payload);


    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "User registered successfully",
        data: { user }
    })
})

const  getMyProfile= catchAsync( async (req: Request, res: Response, next: NextFunction)=>{
   
    const {accessToken} =  req.cookies;
    console.log(accessToken);

    const verifiedToken = jwtUtils.verifyToken(accessToken,config.jwt_access_secret!)
    console.log(verifiedToken);

    if(typeof verifiedToken==="string"){
        throw new Error(verifiedToken);
    }
   
    const profile= await userService.getMyProfileFromDB(verifiedToken.id );
   sendResponse(res,{
    success:true,
    statusCode: HttpStatus.OK,
    message:"user profile fetched successfully",
    data:{profile}
   })
})

export const userController={
    registerUser,
    getMyProfile
}