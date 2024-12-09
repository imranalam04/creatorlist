"use client"
import {signIn} from 'next-auth/react'

const LoginWithGoogle = () => {
    
  return (
    <div>
    <button onClick={() => signIn('google')} className='bg-blue-500 text-white text-center w-full py-4'>
    <span> Sign In with Google</span>
    </button>
    </div>
  )
}

export default LoginWithGoogle