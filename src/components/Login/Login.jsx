import React, { useState } from "react";
import "./Login.module.css"
import { useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";


let schema = z.object({
    email:z.string().email("Please Enter invaild Email"),
    password:z.string().min(8,"Password must be at least 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
})


export function Login() {

  let [successMsg ,setSuccessMsg]=useState("")
  let [isLoading, setIsLoading]=useState(false)
  let {setUserData ,setToken} =useContext(UserContext)
  let navigate=useNavigate()
 
  let {formState, register,handleSubmit}=useForm({
    defaultValues:
    {
      email:"",
      password:"",
    },
    resolver: zodResolver(schema),
  })
  
  
  function LoginFun(data){
    setIsLoading(true)
    axios.post("https://todo-nti.vercel.app/user/login",data).then((res)=>{
        setSuccessMsg(res.data.message)
        localStorage.setItem("Token",res.data.token)
        localStorage.setItem("UserData",JSON.stringify(res.data.user))
        setToken(res.data.token)
        setUserData(res.data.user)
        navigate("/")
       }).catch((err)=>{
          console.log(err.message)
       }).finally(()=>{
        setIsLoading(false)
      }
    )
  }



return <>
<div className="p-20">
<form className="w-full md:w-[50%]  mx-auto py-10  px-15 shadow-2xl rounded-xl" onSubmit={handleSubmit(LoginFun)}>
  <h2 className="text-3xl font-semibold my-4 text-center">Welcome back! Login</h2>
  
  {successMsg &&
  <div className="p-4 mb-6 text-sm text-fg-success-strong rounded-base bg-success-soft" role="alert">
  <span className="font-medium capitalize">{successMsg}</span>
  </div>}

  <div className="relative z-0 w-full mb-5 group">
      <input {...register("email")} type="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
      <label htmlFor="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email Address</label>
      {formState.errors.email &&<p className="text-red-500">{formState.errors.email.message}</p>}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input {...register("password")} type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
      <label htmlFor="floating_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
      {formState.errors.password &&<p className="text-red-500">{formState.errors.password.message}</p>}
  </div>

  
  <button type="submit" className=" my-2 w-full text-white bg-brand box-border border border-transparent cursor-pointer hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
    {isLoading? <span> <i className="fa fa-spin fa-spinner m-1"></i>Loading...</span>:"Login" }
  </button>

</form>
</div>
  </>
}
