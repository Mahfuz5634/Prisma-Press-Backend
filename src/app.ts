import express,{ Application, Request, Response } from "express";


const app:Application = express();

app.get("/",(req:Request,res:Response)=>{
    console.log("Hello Prisma");
})
export default app;