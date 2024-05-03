import React from 'react'

export default function HomePage() {
  return (
    <div className='flex flex-col h-screen overflow-scroll text-white snap-y snap-mandatory' style={{backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)'}}>
      <div className="flex flex-col items-center justify-center w-full h-screen md:flex-row snap-start">
        <div className='flex justify-center md:w-1/2'>
          <img src="logo.PNG" alt="Dog Logo" className="max-w-xs mt-4 mb-8 md:ml-9 max-h-64" />
        </div>
        
        <div className='text-center md:text-left md:w-1/2'>
          <h1 className="text-4xl font-bold">PassGuardian</h1>
          <h2 className="text-3xl font-bold">Secure Your Password</h2>
          <p className="mt-4 ">
            Protect your passwords with our state-of-the-art encryption technology.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-screen snap-start">
        <h2 className="text-3xl font-bold">Stay Connected</h2>
        <div className="flex mt-9">
          <a href="https://github.com/Syl-Ying/Password-Manager" target="_blank" rel="noopener noreferrer" className="mx-2 text-blue-600 hover:text-blue-800">
            <img src='github.png' alt='github logo' className='border-2 rounded-full w-[32px] h-[32px] gap-10'/>
          </a>
          <a href="https://www.linkedin.com/in/shujieying/" target="_blank" rel="noopener noreferrer" className="mx-2 text-blue-600 hover:text-blue-800">
            <img src='linkedin.png' alt='linkedin logo'/>
          </a>
        </div>
      </div>
    </div>
  )
}
