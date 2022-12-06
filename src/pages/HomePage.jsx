import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import {signOut, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate()
  const logout = () =>{
    signOut(auth)
    navigate('/')
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Email: {auth.currentUser?.email}</h1>
            <p className="py-6">
              (Click on home again if email is not displayed)
            </p>
            <button className="btn btn-primary" onClick={logout}>Sign Out</button>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default HomePage;
