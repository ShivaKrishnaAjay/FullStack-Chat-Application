import React from 'react'
import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
import { useRef } from 'react';
const ChatContainer = () => {

  const messageEndRef = useRef(null);
  const {selectedUser,getMessages,messages,isMessagesLoading,subscribeToMessages,unsubscribeFromMessages}=useChatStore();

  const { authUser } = useAuthStore();


  useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessages();

    return ()=>unsubscribeFromMessages();
  },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages]);


useEffect(()=>{
  if(messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({behavior:"smooth"});
  }
},[messages]);




  if(isMessagesLoading){
    return <div className='flex-1 flex flex-col overflow-auto'>
<ChatHeader/>
<MessageSkeleton/>
<MessageInput/>

    </div>;
  }
 
  console.log(selectedUser.profilePicture + " exists");
  return (

    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

<div className='flex-1 p-4 space-y-4 overflow-y-auto'>
{messages.map((message)=>(
  <div key={message._id} className={`chat  ${message.senderId===authUser._id ? 'chat-end' : 'chat-start'}`} ref={messageEndRef}>

    <div className='chat-image avatar'>
<div className='w-10 h-10 rounded-full border'>
      <img src={message.senderId===authUser._id? (authUser.profilePicture || "vite.svg" ): (selectedUser.profilePicture || "vite.svg" ) } alt="Profile Picture"/>
    
    </div>
</div>

<div className="chat-header mb-1">
<time className="text-xs opacity-50 ml-1">
{formatMessageTime(message.createdAt)}
</time>
</div>

<div className='chat-bubble flex flex-col'>
  {message.image && <img src={message.image} alt="Message Image" className='sm:max-w-[200px] mb-2 rounded-md'/>}
  {message.text && <p className='text-sm'>{message.text}</p>}
</div>

</div>

))}
</div>
      
      <MessageInput/>
    </div>


  )
}

export default ChatContainer
