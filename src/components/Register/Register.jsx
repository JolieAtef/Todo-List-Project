import React, { useState } from "react";
import "./Register.module.css"
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";




let schema = z.object({
    name:z.string().min(3,"Name must be at least 3 characters").max(30,"Name must be at most 30 charcters"),
    email:z.string().email("Please Enter invalid Email"),
    password:z.string().min(8,"Password must be at least 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
    confirmPassword:z.string().min(8,"Password must be at least 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
}).refine((data)=> data.password==data.confirmPassword ,{
           message:"Password doesn't match", path:["confirmPassword"]
})


export function Register() {

  let [isLoading, setIsLoading]=useState(false)
  let navigate = useNavigate();
 
  let {formState, register,handleSubmit}=useForm({
    defaultValues:
    {
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    },
    resolver: zodResolver(schema),
  })
  
  
  function RegisterFun(data){
    setIsLoading(true)
    axios.post("https://todo-app-backend-wine.vercel.app/users/signup",data).then((res)=>{
          console.log(res)
          toast.success(res.data.message);
          let timer = setTimeout(() =>{
              navigate("/") 
              clearTimeout(timer)
           } , 1300);
      }).catch((err)=>{   
           toast.error(err.response.data.message)
      }).finally(()=>{
        setIsLoading(false)
      }
    )
  }



return <>
{/* <div className="pt-12">
<form className="w-full md:w-[50%]  mx-auto py-10  px-15 shadow-2xl rounded-xl " onSubmit={handleSubmit(RegisterFun)}>
  <h2 className="text-3xl font-semibold my-4 text-center">Create Account</h2>
  
  {successMsg &&
  <div className="p-4 mb-6 text-sm text-fg-success-strong rounded-base bg-success-soft" role="alert">
  <span className="font-medium capitalize">{successMsg}</span>
  </div>}

  {errorMsg && <div className="p-4 mb-6 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
  <span className="font-medium capitalize">{errorMsg}</span>
  </div>} 

  <div className="relative z-0 w-full mb-5 group">
      <input {...register("name")} type="text" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "  />
      <label htmlFor="floating_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Your Name</label>
      {formState.errors.name &&<p className="text-red-500">{formState.errors.name.message}</p>}
  </div>

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

  <div className="relative z-0 w-full mb-5 group">
      <input {...register("confirmPassword")} type="password" id="floating_confirm_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" "  />
      <label htmlFor="floating_confirm_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Confirm Password</label>
      {formState.errors.confirmPassword &&<p className="text-red-500">{formState.errors.confirmPassword.message}</p>}
  </div>
  
  <button type="submit" className=" my-2 w-full text-white bg-brand box-border border border-transparent cursor-pointer hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
    {isLoading? <span> <i className="fa fa-spin fa-spinner m-1"></i>Loading...</span>:"Submit" }
  </button>

</form>
</div> */}



<div className="min-h-screen grid md:grid-cols-2 ">
  <div className="left_cover relative hidden md:block">
     <img className="object-cover w-full h-full " src="./images/signup_cover.svg" alt="signup cover"/>
     <div className="absolute w-full h-full end-0 top-0 flex justify-center">
      <div className="left-content flex flex-col gap-5 w-5/9 items-start mt-50 ">
       <div className="logo flex justify-center items-center gap-1.5">
        <div className="logo_icon  flex justify-center w-11 h-11 rounded-xl bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] ">
          <img src="./images/logo.svg" alt="logo" className="w-5"/>
        </div>
          <h1 className="font-bold text-xl">Todo List</h1>
       </div>

       <h2 className="font-bold text-4xl md:text-5xl lg:text-7xl ">The luxury of <span className="text-[var(--primary-color)]">focus</span>.</h2>
       <p className="text-[var(--secondary-color)] text-xl ">Experience a productivity tool designed like remium editorial. No noise, just the quiet clarity of your next move.</p>
       </div>
     </div>
  </div>
  <div className="signup_form px-10 pt-15 md:px-20 lg:px-30  bg-[var(--low-color)]">
    <Toaster toastOptions={{duration:2000, position:'bottom-right' ,
      success:{
      iconTheme: {
        primary: 'var(--medium-color)',
      },
    },
    error:{
      iconTheme: {
        primary: 'var(--medium-color)',
      },
    }
    }}/>
    <form onSubmit={handleSubmit(RegisterFun)}>
     <div className="form_header mb-8">
        <h5 className="text-[10px] font-semibold text-[var(--primary-color)]">START YOUR JOURNEY</h5>
        <h2 className="text-4xl font-semibold my-2.5">Achieve more with Todo List</h2>
        <p className="text-[var(--secondary-color)] ">Join a community of focused professionals.</p>
     </div>
    <label htmlFor="input-group-1" className="block mb-1.5 mt-3.5  text-sm  text-[var(--secondary-color)] ">Full Name</label>
    <div className="relative">
    <input {...register("name")}  type="text" id="input-group-1" className="block w-full ps-4 pe-3 py-2.5 bg-[#fbfaf7] border border-default-medium text-sm rounded-base focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-xs placeholder:text-[#a6a6a4]" placeholder="Julianne Moore"/>
    {formState.errors.name &&<p className="text-sm text-[var(--secondary-color)]/80 italic">{formState.errors.name.message}</p>}
    </div>

    <label htmlFor="input-group-2" className="block mb-1.5 mt-3.5 text-sm  text-[var(--secondary-color)]">Email Address</label>
    <div className="relative">
    <input {...register("email")}  type="email" id="input-group-2" className="block w-full ps-4 pe-3 py-2.5 bg-[#fbfaf7] border border-default-medium text-sm rounded-base focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-xs placeholder:text-[#a6a6a4]" placeholder="julianne@example.com"/>
    {formState.errors.email &&<p className="text-sm text-[var(--secondary-color)]/80 italic">{formState.errors.email.message}</p>}
    </div>


    <label htmlFor="input-group-3" className="block mb-1.5 mt-3.5 text-sm  text-[var(--secondary-color)]">Password</label>
    <div className="relative">
    <input {...register("password")}  type="password" id="input-group-3" className="block w-full ps-4 pe-3 py-2.5 bg-[#fbfaf7] border border-default-medium text-sm rounded-base focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-xs placeholder:text-[#a6a6a4]" placeholder="••••••••••••"/>
    {formState.errors.password &&<p className="text-sm text-[var(--secondary-color)]/80 italic">{formState.errors.password.message}</p>}
    </div>

    <label htmlFor="input-group-4" className="block mb-1.5 mt-3.5 text-sm  text-[var(--secondary-color)]">Confirm Password</label>
    <div className="relative">
    <input {...register("confirmPassword")}  type="password" id="input-group-4" className="block w-full ps-4 pe-3 py-2.5 bg-[#fbfaf7] border border-default-medium text-sm rounded-base focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-xs placeholder:text-[#a6a6a4]" placeholder="••••••••••••"/>
    {formState.errors.confirmPassword &&<p className="text-sm text-[var(--secondary-color)]/80 italic">{formState.errors.confirmPassword.message}</p>}
    </div>

    <button type="submit" className=" my-4 md:my-8 w-full text-[var(--low-color)] bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] shadow-2xl shadow-[color:var(--primary-color)]/50  box-border border border-transparent cursor-pointer hover:bg-amber-800 focus:ring-4 focus:ring-[var(--primary-color)]/20 font-medium leading-5 rounded-base text-sm px-4 py-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
    {isLoading? <span> <i className="fa fa-spin fa-spinner m-1"></i>Loading...</span>:"Create Account" }
    </button>

    <p className="text-center text-[var(--secondary-color)]">Already have an account? <Link to="/" className="text-[var(--primary-color)]">Log in</Link></p>

    </form>
  </div>
</div>

  </>
}
