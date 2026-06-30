
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"




const createPost=async (payload:ICreatePostPayload,UserId:string)=>{

     const result = await prisma.post.create({
        data:{
            ...payload,
            authorId: UserId
        }
     })

     return result;
}

const getAllPosts=async()=>{
    const post= await prisma.post.findMany({
        include:{
            author:{
                omit:{
                    password:true
                }
            },
            comments:true
        }
    });
    return post;
}

const getPostStats=()=>{

}

const getMyProfile=( )=>{

}

const getMyPost=async (authorId:string)=>{
    const result = await prisma.post.findMany({
        where:{
            authorId
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            comments:true,
            author:{
                omit:{
                    password:true
                }
            },
            
                _count:{
                    select:{
                        comments:true
                    }
                }
            
        }
    })
    return result;
}

const getPostById= async(postId:string)=>{
   const post = await prisma.post.findUniqueOrThrow({
    where:{
        id:postId
    }
   })
   const updatePost =  await prisma.post.update({
    where:{
        id:postId
    },
    data:{
        views:{
            increment:1
        }
    },
    include:{
        author:{
            omit:{
                password:true
            }
        },
        comments:true
    }
   })
   return updatePost;
}

const updatePost=()=>{

}

const deletePost=()=>{

}

export const postService={
    createPost,
    getAllPosts,
    getPostStats,
    getPostById,
    updatePost,
    deletePost,
    getMyPost,
    getMyProfile
}