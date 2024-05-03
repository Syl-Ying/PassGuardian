import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='h-screen'>
      <h1 className="mt-16 ml-32 font-mono uppercase">404 Not found</h1>
      <div className="grid grid-cols-1 gap-10 mx-5 mt-20 mb-20 md:grid-cols-2 md:gap-20 md:mt-0 md:mx-20">
        <div>
          <img src="scarecrow.png" alt="404-Scarecrow" className="w-full" />
        </div>
        
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-6xl font-bold md:text-4xl md:mb-0">I have bad news for you</h2>
          <p className="mt-4 font-mono text-base md:text-lg md:mt-0">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <NavLink to='/' className="w-1/2 px-8 py-6 mt-4 font-mono text-lg text-center text-white uppercase bg-gray-900 border-none outline-none cursor-pointer btn hover:bg-black focus:bg-black active:bg-black">Back to homepage</NavLink>
        </div>
      </div>
      
      <footer className="mb-10 text-center">
          <p className="text-lg font-semibold">PassGuardian - passguardian.com</p>
        </footer>
    </div>
  )
}
