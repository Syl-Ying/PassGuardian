import React from 'react'

export default function HomePage() {
  return (
    <div className='flex flex-col overflow-scroll text-white snap-y snap-mandatory' style={{backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)'}}>
      
      <div className='snap-start'>
        <div className="flex flex-col items-center justify-center w-full h-screen md:flex-row">
          <div className='flex flex-col items-center text-center md:w-3/5 md:text-left'>
            <div className='md:ml-20'>
              <h1 className="mb-2 text-4xl font-bold md:my-9 lg:text-6xl">PassGuardian</h1>
              <h2 className="text-3xl font-bold">Secure Your Password</h2>
              <p className="mt-4 ">
                Protect your passwords with our state-of-the-art encryption technology.
              </p>
            </div>
          </div>

          <div className='flex justify-start mt-12 md:w-2/5'>
            <img src="logo.PNG" alt="Dog Logo" className="max-w-md mt-4 mb-8 md:ml-4 max-h-64 md:max-h-80" />
          </div>
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
