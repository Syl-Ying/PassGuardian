import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import { isAuth } from "../auth/helpers";

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `/api/signup`,
            data: { username, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                setValues({ ...values, username: '', email: '', password: '' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error.response.data);
                toast.error(error.response.data.error);
            });
    };


    const signupForm = () => (
        <form>
            <div className="">
                <input onChange={handleChange('username')} value={username} type="text" placeholder="Username" className="w-full px-2 py-1 border border-gray-400" />
            </div>
            <div className="mt-5">
                <input onChange={handleChange('email')} value={email} type="text" placeholder="Email" autoComplete="username" className="w-full px-2 py-1 border border-gray-400" />
            </div>
            <div className="mt-5">
                <input onChange={handleChange('password')} value={password} type="password" placeholder="Password" autoComplete="new-password" className="w-full px-2 py-1 border border-gray-400" />
            </div>
            <div className="mt-5">
                <input type="password" placeholder="Confirm Password" autoComplete="new-password" className="w-full px-2 py-1 border border-gray-400" />
            </div>
            
            <div className="mt-5">
                <input type="checkbox" className="border border-gray-400" />
                <span>
                    I accept the <a href="#" className="font-semibold text-purple-500">Terms of Use</a> &  <a href="#" className="font-semibold text-purple-500">Privacy Policy</a> 
                </span>
            </div>
            
            <div className="mt-5">
                <button onClick={clickSubmit} className="w-full py-3 text-center text-white bg-purple-500">Register Now</button>
            </div>
        </form>
    );

    // Once signed up, automatically sign in

    // If user has signed in, redirect to password page
    if (isAuth()) {
        return <Navigate to="/password" />;
    }

    return (
        <div className="flex items-center py-4 md:py-16">
            <div className="" style={{backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)'}}>
                <div className="container mx-auto">
                    <div className="flex flex-col w-10/12 mx-auto overflow-hidden bg-white shadow-lg lg:flex-row lg:w-8/12 rounded-xl">
                        <div className="flex flex-col items-center justify-center w-full p-12 bg-center bg-no-repeat bg-cover lg:w-1/2" style={{backgroundImage: "url('src/assets/xx.png')"}}>
                            <h1 className="mb-3 text-3xl text-black">Welcome!</h1>
                            <div>
                                <p className="text-black">
                                    PassGuadian helps you to manage your passwords. It can automatically generate hashed password. 
                                    <a href="#" className="font-semibold text-purple-500">Learn more</a>
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-full px-12 py-16 lg:w-1/2">
                            <ToastContainer />
                            <h2  className="mb-4 text-3xl">Register</h2>
                            {signupForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup;