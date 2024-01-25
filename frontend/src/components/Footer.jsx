import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <div className='font-mono text-sm text-zinc-500 text-center fixed w-full bottom-0 py-1 border-t-2 border-zinc-500'>
        <p>MERN Shop &copy; {currentYear}</p>
    </div>
  )
}

export default Footer