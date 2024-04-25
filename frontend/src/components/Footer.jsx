import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='fixed bottom-0 w-full py-2 text-center text-white bg-[#9F7AEA]' >
      <p>PasswordGuardian &copy; {currentYear} All Rights Reserved.</p>
    </footer>
  )
}

export default Footer