import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "cloudinary";
import {getReceiverSocketId,io} from "../lib/socket.js";

//Dynamic /[:id]

export const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        
      const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");//$ne->not equal
      
        res.status(200).json(filteredUsers)

    }
    catch(err){
            console.error("Error in getUsersForSidebar : ",err.message );
            res.status(500).json({error:"Internal server Error"});
    }
}

export const getMessages=async(req,res)=>{
   try{
       const {id :userToChatId}=req.params;
       const myId=req.user._id; 
       const messages=await Message.find({
           $or : [
               {senderId :myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}
            ]
        })  
        

    res.status(201).json(messages)
    }
    catch(error){
        console.log(error.message);
    }
}

export const sendMessage=async(req,res)=>{
 
 try{
const {text,image}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user._id;

let imageUrl;
if(image){
const uploadResponse=await cloudinary.uploader.upload(image);
imageUrl=uploadResponse.secure_url;
}
const newMessage=new Message({
    text,image:imageUrl,senderId,receiverId
})

await newMessage.save();

//todo: realtime functionality goes here=> socket.io

const receiverSocketId=getReceiverSocketId(receiverId);

if(receiverSocketId){
    
    //only send to receiver Id.
    io.to(receiverSocketId).emit("newMessage",newMessage);


}

res.status(200).json(newMessage);

 }catch(err){

console.log(err.message);
res.status(500).json({error:"Internal server error"});
 }
 
}
