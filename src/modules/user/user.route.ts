import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { userService } from "./user.service";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post("/register",userController.registerUser);
router.get("/me",async(req:Request,res:Response,next:NextFunction)=>{


     const {accessToken} =  req.cookies;
        console.log(accessToken);
    
        const verifiedToken = jwtUtils.verifyToken(accessToken,config.jwt_access_secret!)
        console.log(verifiedToken);
    
        if(typeof verifiedToken==="string"){
            throw new Error(verifiedToken);
        }
       
        const profile= await userService.getMyProfileFromDB(verifiedToken.id );
        
        const requiredRole=[Role.ADMIN,Role.USER];
        if(!requiredRole.includes(profile.role)){
            res.status(404).json({
                success:false,
                message:"Forbidden,you do not have access!!!"
            })
        }
        next();

},userController.getMyProfile);

export const userRoutes=router;