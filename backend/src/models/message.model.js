import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },

},{timestamps:true});

const Message=mongoose.model("Message",messageSchema);

export default Message;

 