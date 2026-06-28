import { prisma } from "../../lib/prisma";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import  HttpStatus  from "http-status";
import bcrypt from "bcrypt";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


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

export const userController={
    registerUser
}