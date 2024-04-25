import { useState } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const { email, password } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${import.meta.env.VITE_REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                setValues({ ...values,  email: '', password: '' });
                toast.success(`Welcome back, ${response.data.user.name}!`);
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form>
            <div className="mt-5">
                <input onChange={handleChange('email')} value={email} type="text" placeholder="Email" className="w-full px-2 py-1 border border-gray-400" />
            </div>
            <div className="mt-5">
                <input onChange={handleChange('password')} value={password} type="password" placeholder="Password" className="w-full px-2 py-1 border border-gray-400" />
            </div>
            
            <div className="mt-5">
                <button onClick={clickSubmit} className="w-full py-3 text-center text-white bg-purple-500">Sign in</button>
            </div>
        </form>
    );

    return (
        <div className="col-md-6 offset-md-3">
            <div className="py-40" style={{backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)'}}>
                <div className="container mx-auto">
                    <div className="flex flex-col w-10/12 mx-auto overflow-hidden bg-white shadow-lg lg:flex-row lg:w-8/12 rounded-xl">
                        <div className="w-full px-12 py-16 lg:w-1/2">
                            <ToastContainer />
                            <h2  className="mb-4 text-3xl">Welcome Back!</h2>
                            {signinForm()}
                            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                                Forgot password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signin;