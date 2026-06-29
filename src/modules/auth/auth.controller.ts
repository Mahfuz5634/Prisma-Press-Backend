import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus  from "http-status";


const loginUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const payload = req.body;

        const {accessToken,refreshToken} =   await authService.loginUser(payload);

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"none",
            maxAge:1000*60*60*24
        })

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"none",
            maxAge:1000*60*60*24*7
        })



        sendResponse(res,{
            success:true,
            statusCode: HttpStatus.OK,
            message:"User is login succesfully",
            data:{accessToken,refreshToken}
        });
})

const refreshToken = catchAsync(async(req:Request,res:Response,nex:NextFunction)=>{
    const refreshToken=req.cookies.refreshToken;
    const {accessToken}=await authService.refreshToken(refreshToken);

    sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"token created successfully",
        data:accessToken
    })
     res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"none",
            maxAge:1000*60*60*24
        })

})


export const authController = {
    loginUser,
    refreshToken
} 