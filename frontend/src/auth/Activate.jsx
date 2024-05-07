import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import jwt from 'jsonwebtoken';

const Activate = ({ match }) => {
    const [values, setValues] = useState({
        username: '',
        token: '',
        show: true
    });
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            let { username } = jwt.decode(token);
            if (token) {
                setValues({ ...values, username, token });
            }
        }
    }, [token]);

    const { username, show } = values;
    
    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `/api/account-activation`,
            data: { token }
        })
            .then(response => {
                console.log('Activate Success', response);
                setValues({ ...values, show: false });
                toast.success(response.data.message);
                navigate('/login');
            })
            .catch(error => {
                console.log('Activate Error', error.response.data.error);
                toast.error(error.response.data.error);
            });
    };

    const activationLink = () => (
        <div>
            <h1 className="text-gray-500">Hi {username}, please confirm your email.</h1>
            <button onClick={clickSubmit} className="px-4 py-2 mt-4 text-white bg-purple-500 rounded hover:bg-purple-400 focus:outline-none focus:shadow-outline">Confirm</button>
        </div>
    )

    return (
        <div className="col-md-6 offset-md-3">
            <div className="py-40" style={{backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)'}}>
                <div className="container mx-auto">
                    <div className="flex flex-col w-10/12 mx-auto overflow-hidden bg-white shadow-lg lg:flex-row lg:w-8/12 rounded-xl">
                        <div className="w-full px-12 py-16 lg:w-1/2">
                            <ToastContainer />
                            <h2  className="mb-4 text-3xl text-gray-700">Let's verify your email</h2>
                            {activationLink()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Activate;