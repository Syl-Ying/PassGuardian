import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full flex items-center justify-between flex-wrap bg-[#9F7AEA] p-6 border-b border-solid">
            <div className="flex items-center flex-shrink-0 text-[#f5f5f5] mr-6">
                <img src='src/assets/logo.PNG'  className="mr-2 fill-current w-9 h-9" width="60" height="60" viewBox="0 0 60 60" />
                <span className="text-xl font-semibold tracking-tight">PassGuardian</span>
            </div>
            
            <div className="block md:hidden">
                <button className="flex items-center px-3 py-2 text-[#f8fafc] border border-[#f8fafc] rounded hover:text-[#2dd4bf] hover:border-[#2dd4bf]">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            
            <div className="flex-grow block w-full md:flex md:items-center md:w-auto">
                <div className="text-sm md:flex-grow">
                    <NavLink to="/" className="block mt-4 mr-4 text-white md:inline-block md:mt-0 hover:text-[#99f6e4]">
                        Home
                    </NavLink>
                    <NavLink  className="block mt-4 text-white md:inline-block md:mt-0 hover:text-[#99f6e4]">
                        Passwords
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/login" className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white md:mt-0">
                        Login
                    </NavLink>
                </div>

                <div className='pl-2'>
                    <NavLink to="/signup" className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white md:mt-0">
                        Sign up
                    </NavLink>
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;