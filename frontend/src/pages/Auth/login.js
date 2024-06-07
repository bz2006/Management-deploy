import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { useAuth } from "../../context/auth";
import "./signup.css";



function Login() {
    var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth] = useAuth();
    const authData = JSON.parse(localStorage.getItem("auth"));

   


    useEffect(() => {
        message.info("Login to continue to Manage Console")
        const authData = JSON.parse(localStorage.getItem("auth"));
        const redirectUrl = sessionStorage.getItem("redirectUrl");

        if (authData) {
            navigate(redirectUrl || "/");
        }
    }, []);

    console.log(auth);

    const loginf = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password });
            if (res && res.data.success) {
                localStorage.setItem("auth", JSON.stringify(res.data));
                message.success('Login Successfull');
                navigate("/");
                window.location.reload();
            } else {
                message.error('Failed to login');

            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    };


    return (
        <>
            <div className='main'>
                <form onSubmit={loginf}>
                    <div className='formdiv'>
                        <h1 className='logtxt'>Log In</h1>


                        <div className="one">
                            <label htmlFor="email" className="formtxt">Email address</label><br />
                            <input type="email" className="field1" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="two">
                            <label htmlFor="password" className="formtxt">Password</label><br />
                            <input type="password" className="field2" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="subbtn">Login</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default Login;
