import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Mail,User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';


const LoginPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

const {login,isLoggingIn}=useAuthStore();

const handleSubmit=async(e)=>{
  e.preventDefault();
  await login(formData);
}

  return (
    
    <div className='grid lg:grid-cols-2 min-h-screen'>

        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div className='w-full max-w-md space-y-8'>
            {/*Logo*/}

<div className="text-center mb-8">
<div className="flex flex-col items-center gap-2 group">
    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
    <MessageSquare className='size-6 text-pink-500'></MessageSquare>
    </div>
    <h1 className="text-2xl font-bold mt-2">Create Account</h1>
    <p className="text-base-content/60">Get started with Your Free Account</p>
</div>
</div>

<form action="" onSubmit={handleSubmit} className='space-y-6'>


    <div className="form-control">
    <label className='label'>
        <span className='label-text font-medium'>Email</span>
    </label>
    <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Mail className='size-5 text-base-content/40'></Mail>
        </div>
        <input type="email" placeholder='your@email.com' className='input input-bordered w-full pl-10' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
    </div>
</div>

<div className="form-control">
    <label className='label'>
        <span className='label-text font-medium'>Password</span>
    </label>
    <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Lock className='size-5 text-base-content/40'></Lock>
        </div>
        <input type={showPassword?"text" :"password"} placeholder='********' className='input input-bordered w-full pl-10' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>

        <button type='button' className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={()=>setShowPassword(!showPassword)}>

            {showPassword ? (<EyeOff className='size-5 text-base-content/40'></EyeOff>) : (<Eye className='size-5 text-base-content/40'></Eye>)}
        </button>
    </div>
</div>

<button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
    {isLoggingIn ? (<>
        <Loader2 className='size-5 animate-spin'></Loader2>
        Loading...
        </>
    ) : "Sign in"}
</button>

</form>

<div className='text-center mt-4'>

    <p className='text-base-content/60'>Don't have an account? <Link to="/signup" className='link link-primary'>Create Account</Link></p>
</div>

</div>
 </div>

{/*Right Side*/}

<AuthImagePattern title="Join our Community" subtitle="Join our community of developers and designers to share your ideas and get feedback from the community."/>



    </div>
  )
}

export default LoginPage
