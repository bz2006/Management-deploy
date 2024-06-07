import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/auth';


function Signup() {
  const [auth] = useAuth();
  var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const redirectUrl = sessionStorage.getItem("redirectUrl");
  const formdata = {};

  const welcomeMail = async () => {
    try {
      const response = await fetch('/send-welcome-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      });
      if (response.ok) {
      } else {
      }
    } catch (error) {
      
    }
  };
 

  const signupf = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/signup", { username, email, password });
      if (res && res.data.success) {
        toast.success("Sign Up Successful");
        const res = await axios.post("/api/v1/auth/login", { email, password });
        if (res && res.data.success) {
          formdata.name = username;
          formdata.email = email;
          await welcomeMail()
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(redirectUrl || "/");
          window.location.reload();
        } else {
          toast.error("Log In failed")
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <>
      <video autoPlay loop muted className="video-bg">
        <source src={`${hosturl}weblogin.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='mdivs'>
        <form onSubmit={signupf}>
          <div className='frm'>
            <h1 className="txt">Sign Up</h1>
            <h6 >Already a member?<a href='/login' style={{ textDecoration: "none", color: "green" }}> Log In</a></h6>


            <div className="one">
              <label htmlFor="email" className="form-label">User Name</label>
              <input type="text" className="form-control" placeholder="User Name" value={username} onChange={(e) => setusername(e.target.value)} required />
            </div>


            <div className="twos">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
            </div>

            <div className="three">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
            </div>

            <button type="submit" className="subbtn">Sign Up</button>
            < hr className='divi' />
          </div>
        </form>
      </div>
    </>




  )
}

export default Signup