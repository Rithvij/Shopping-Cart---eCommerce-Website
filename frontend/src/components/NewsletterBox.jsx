import React from 'react'

const NewsletterBox = () => {

    {/* to prevent to reload when we submit */}
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
      <p className='text-gray-400 mt-3'>Exclusive subscription</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required></input>
        <button className='bg-black text-white text-xs px-10 py-4' type="submit">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
