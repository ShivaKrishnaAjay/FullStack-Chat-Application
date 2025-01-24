
import { create } from "zustand";

import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    setMessages:(messages)=>{
        
    },
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
   
    getUsers:async()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false});
        }
    },

    getMessages:async (userId)=>{
        set({isMessagesLoading:true});
        try{
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },

subscribeToMessages:async(userId)=>{

    const {selectedUser}=get();
    if(!selectedUser)
        return;
    
    const socket=useAuthStore.getState().socket;

    //newMessage is the event name that we are listening to
    socket.on("newMessage",(message)=>{

        const isMessageSentFromSelectedUser=message.senderId===selectedUser._id;

        if(!isMessageSentFromSelectedUser)
            return;

        set({messages:[...get().messages,message]});
    });
},
//when we close our window
unsubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
} ,

    setSelectedUser:(selectedUser)=>set({selectedUser}),
    
    sendMessage:async(messageData)=>{
const {selectedUser,messages}=get();
    try{
        const res=await axiosInstance.post(`/messages/send/${get().selectedUser._id}`,messageData);
        set({messages:[...get().messages,res.data]});
    }catch(error){
        toast.error(error.response.data.message);
    }
},


}));

