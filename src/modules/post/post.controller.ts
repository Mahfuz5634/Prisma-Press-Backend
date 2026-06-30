import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus  from "http-status";




const createPost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
     
        const id=req.user?.id as string;
        console.log(id);
        const payload=req.body;

        const result = await postService.createPost(payload,id);

       
    sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"Post created successfully",
        data:result
    })


})

const getAllPosts=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
        const result= await postService.getAllPosts();
           
        sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"Retrive All post",
        data:result
    })
})

const getPostStats=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const getMyProfile=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const getMyPost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
      const authorId= req.user?.id;

      const result= await postService.getMyPost(authorId as string);
      
      sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"My post retrive succesfully",
        data:result
    })


})

const getPostById=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
    const postId = req.params.postId;
    if(!postId){
        throw new Error("post id required")
    }

    const result = await postService.getPostById(postId as string);
     sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"post retrive succesfully",
        data:result
    })
})

const updatePost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
         const authorId = req.user?.id;
         const isAdmin = req.user?.role === "ADMIN";

         const postId = req.params.postId;
         const payload = req.body;

         const result = await postService.updatePost(postId as string,payload,authorId as string,isAdmin);

        sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"post update successfully",
        data:result
    })
})

const deletePost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
        const authorId = req.user?.id;
         const isAdmin = req.user?.role === "ADMIN";

         const postId = req.params.postId;;

         const result = await postService.deletePost(postId as string,authorId as string,isAdmin);

        sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"post delete successfully",
        data:null
    })
})

export const postController={
    createPost,
    getAllPosts,
    getPostStats,
    getPostById,
    updatePost,
    deletePost,
    getMyProfile,
    getMyPost
}