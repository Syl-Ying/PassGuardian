import React from 'react'

export default function HomePage() {
  return (
    <div className='flex flex-col h-screen overflow-scroll snap-y snap-mandatory'>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-blue-100 snap-start">
        <h1 className="text-4xl font-bold">PassGuardian</h1>
        <img src="src/assets/logo.png" alt="Dog Logo" className="max-w-xs mt-4 max-h-64" />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-screen bg-green-100 snap-start">
        <h2 className="text-3xl font-bold">Secure Your Data</h2>
        <p className="max-w-md mt-4 text-center">
          Protect your passwords and sensitive information with our state-of-the-art encryption technology.
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center w-full h-screen bg-purple-100 snap-start">
        <h2 className="text-3xl font-bold">Stay Connected</h2>
        <div className="flex mt-4">
          <a href="https://github.com/Syl-Ying/Password-Manager" target="_blank" rel="noopener noreferrer" className="mx-2 text-blue-600 hover:text-blue-800">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/shujieying/" target="_blank" rel="noopener noreferrer" className="mx-2 text-blue-600 hover:text-blue-800">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
