import React from 'react'
import Link from 'next/link'


const NoLogin = () => {
  return (
    <div className='w-[100%] h-[40vh] flex justify-center items-center '>
    <div className='flex flex-col gap-2 text-white justify-center items-center'>
      <h2 className='text-2xl font-bold'>No Login Detected</h2>
      <p className='text-lg '>Please log in to access this content.</p>
      <Link href={"/login"}>
          <p className='text-blue-500 text-md hover:underline'>click here to login</p>
        </Link>
    </div>
    </div>
  )
}

export default NoLogin
