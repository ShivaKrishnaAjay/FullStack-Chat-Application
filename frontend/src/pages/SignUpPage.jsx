import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import { User,MessageSquare } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail,Eye,EyeOff } from 'lucide-react'
import { Lock,Loader2 } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import { toast } from 'react-hot-toast'
const SignUpPage = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:"",
    })
    const {signup,isSigningUp}=useAuthStore();

    const validateForm=()=>{
        if(!formData.fullName.trim())return toast.error("Full Name is required")
        
        if(!formData.email.trim()) return toast.error("Email is required")

            if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email")
                if(!formData.password)return toast.error("Password is required")
                if(formData.password.length<8)return toast.error("Password must be at least 8 characters")
                    
                    return true;
    
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const success=validateForm();

        if(success===true)signup(formData);
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
        <span className='label-text font-medium'>Full Name</span>
    </label>
    <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <User className='size-5 text-base-content/40'></User>
        </div>
        <input type="text" placeholder='Enter your Name' className='input input-bordered w-full pl-10' value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})}/>
    </div>

    </div>

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

<button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
    {isSigningUp ? (<>
        <Loader2 className='size-5 animate-spin'></Loader2>
        Loading...
        </>
    ) : "Create Account"}
</button>

</form>

<div className='text-center mt-4'>

    <p className='text-base-content/60'>Already have an account? <Link to="/login" className='link link-primary'>Sign In</Link></p>
</div>

</div>
 </div>

{/*Right Side*/}

<AuthImagePattern title="Join our Community" subtitle="Join our community of developers and designers to share your ideas and get feedback from the community."/>



    </div>
  )
}

export default SignUpPage
