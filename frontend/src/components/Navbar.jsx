import { isAuth, signout } from '@/auth/helpers';
import { Fragment, useState } from 'react';
import { NavLink, useMatches, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const history = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const handleSignout = () => {
        signout(() => {
            history('/');
        })
    };

    let { pathname } = useMatches()[1];
    const isActive = path => {
        if (path === pathname) {
            return { color: '#98FB98' };
        } else {
            return { color: '#f5f5f5' };
        }
    };

    return (
        <nav className="z-10 fixed top-0 w-full flex items-center justify-between flex-wrap bg-[#9F7AEA] p-6">
            <div className="flex items-center flex-shrink-0 text-[#f5f5f5] mr-6">
                <img src='/logo.PNG'  className="mr-2 fill-current w-9 h-9" width="60" height="60" viewBox="0 0 60 60" />
                <span className="text-xl font-semibold tracking-tight">PassGuardian</span>
            </div>
            
             {/* Mobile Navigation */}
            <div className="block md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 text-[#f8fafc] border border-[#f8fafc] rounded hover:text-[#2dd4bf] hover:border-[#2dd4bf]">
                    <svg className={`w-3 h-3 fill-current ${isOpen ? "hidden" : "block"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title className='sr-only'>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>

                    <svg className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
            </div>
            
             {/* Desktop Navigation */}
            <div className={`flex-grow block w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
                <div className="text-sm md:flex-grow">
                    <NavLink to="/" className="block mt-4 mr-4 text-white md:inline-block md:mt-0 hover:text-[#99f6e4]" style={isActive('/')}>
                        Home
                    </NavLink>

                    <NavLink to="/password" style={isActive('/password')} className="block mt-4 text-white md:inline-block md:mt-0 hover:text-[#99f6e4]">
                        Passwords
                    </NavLink>
                </div>

                {!isAuth() && (
                    <Fragment>
                        <div className='md:px-2'>
                            <NavLink to="/login" className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:bg-[#6e69f8] md:mt-0"style={isActive('/login')}>
                                Sign in
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/signup" className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:bg-[#6e69f8] md:mt-0"style={isActive('/signup')}>
                                Sign up
                            </NavLink>
                        </div>
                    </Fragment>
                )}

                {isAuth() && (
                    <div>
                        <span  className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white rounded md:mt-0">
                            {isAuth().username}
                        </span>
                    </div>
                )}

                {isAuth() && (
                    <div>
                        <span onClick={handleSignout} className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:bg-[#6e69f8] md:mt-0">
                            LogOut
                        </span>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;