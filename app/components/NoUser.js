import React from 'react'

const NoUser = () => {
  return (
    <div className='flex flex-col justify-center items-center h-96 gap-4'>
      <h2 className='text-4xl font-bold text-white '>User Not Found</h2>
      <p className='text-lg  text-white '>Sorry, we couldn't find the user you're looking for.</p>
    </div>
  )
}

export default NoUser
