import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {FcGoogle} from 'react-icons/fc'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase-config";
import { async } from "@firebase/util";
const Sign = () => {
  const provider = new GoogleAuthProvider()
  const googleSignIn = async() => {
   await signInWithPopup(auth,provider).then().catch()
   navigate('/home')
  }
  const [ShowPassword, setShowPassword] = useState(false);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate();
  const schema = new yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().min(6).max(30).required(),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Passwords are not matching")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitHandler = (data) => {
    createUserWithEmailAndPassword(auth, data.Email, data.Password);
    navigate("/home");
  };
  return (
    <div className="flex justify-center flex-col p-8">
      {errors.Email ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errors.Email?.message}</span>
            <span> {errors.Password?.message}</span>
            <span> {errors.ConfirmPassword?.message}</span>
          </div>
        </div>
      ) : errors.Password ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errors.Email?.message}</span>
            <span> {errors.Password?.message}</span>
            <span> {errors.ConfirmPassword?.message}</span>
          </div>
        </div>
      ) : errors.ConfirmPassword ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errors.Email?.message}</span>
            <span> {errors.Password?.message}</span>
            <span> {errors.ConfirmPassword?.message}</span>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex justify-center mt-11">
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Email</span>
            <input
              type="text"
              autoComplete="off"
              className="input input-bordered "
              {...register("Email")}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-11">
        <div className="form-control">
          <label className="label">
            <span className="label-text"></span>
            <button
              className="btn btn-sm"
              onClick={() => {
                setShowPassword(!ShowPassword);
              }}
            >
              <span className="label-text-alt">Show Password</span>
            </button>
          </label>
          <label className="input-group input-group-vertical">
            <span>Password</span>
            <input
              type={ShowPassword ? "text" : "password"}
              autoComplete="off"
              className="input input-bordered "
              {...register("Password")}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-11">
        <div className="form-control">
          <label className="label">
            <span className="label-text"></span>
            <button
              className="btn btn-sm"
              onClick={() => {
                setShowConfirmPassword(!ShowConfirmPassword);
              }}
            >
              <span className="label-text-alt">Show Password</span>
            </button>
          </label>
          <label className="input-group input-group-vertical">
            <span>Confirm Password</span>
            <input
              type={ShowConfirmPassword ? "text" : "password"}
              autoComplete="off"
              className="input input-bordered "
              {...register("ConfirmPassword")}
            />
          </label>
        </div>
      </div>
      <button className="btn mt-7" onClick={googleSignIn}><FcGoogle className="mx-3" size='24' />  Sign In with Google</button>
      <button className="btn  mt-7 " onClick={handleSubmit(submitHandler)}>
        Submit
      </button>
    </div>
  );
};

export default Sign;
