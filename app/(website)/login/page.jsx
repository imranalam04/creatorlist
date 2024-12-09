import React from 'react'
import LoginWithGoogle from '../../components/buttons/LoginWithGoogle'

const page = () => {
  return (
    <div>
      <div className='bg-white border p-4 m-4 max-w-xs mx-auto mb-6'>
        <h1 className='text-4xl font-bold text-center mb-6'>sign In</h1>
        <p className='mb-6 text-center text-gray-500'>Sign in to your account using one of the methods below</p>
        <LoginWithGoogle />
      </div>
    </div>
  )
}

export default page