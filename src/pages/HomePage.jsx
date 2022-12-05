import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
const HomePage = () => {
  useEffect(() => {
   setShow(true)
  }, [])
  const [Show, setShow] = useState(false)
  const navigate = useNavigate()
  const logout = () =>{
    signOut(auth)
    navigate('/')
  }
  return (
    <div>
      {Show && <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Email: {auth.currentUser?.email}</h1>
            <p className="py-6">
              I'm grateful that you checked my project out.
            </p>
            <button className="btn btn-primary" onClick={logout}>Sign Out</button>
          </div>
        </div>
      </div>  }
    </div>
  );
};

export default HomePage;
