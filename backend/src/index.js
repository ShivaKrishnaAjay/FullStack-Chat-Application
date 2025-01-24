import express from 'express';
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import {app,server} from "./lib/socket.js"
import MessageRoutes from "./routes/message.route.js"
import cors from "cors"

import path from "path"
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT=process.env.PORT;
const dir_name=path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true 
}))


console.log("In index of home page");

app.use("/api/auth",authRoutes)
app.use("/api/messages",MessageRoutes)


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(dir_name,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(dir_name,"frontend","dist","index.html"))
    })
}



server.listen(PORT, ()=>{
    console.log("Server is running on port  " , PORT)
    connectDB();
})
