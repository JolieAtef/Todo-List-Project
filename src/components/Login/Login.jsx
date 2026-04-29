import React, { useState } from "react";
import "./Login.module.css"
import { useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";


let schema = z.object({
    email:z.string().email("Please Enter invalid Email"),
    password:z.string().min(8,"Password must be at least 8 characters").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
})


export function Login() {

  let [isLoading, setIsLoading]=useState(false)
  let {setToken , setUserData , setDueTasks} =useContext(UserContext)
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
    axios.post("https://todo-app-backend-wine.vercel.app/users/login",data).then((res)=>{
          toast.success(res.data.message);
          localStorage.setItem("Token",res.data.token)
          setToken(res.data.token)
          getUser()
          getDueTasks()
          let timer = setTimeout(() =>{
          navigate("/home")
          clearTimeout(timer)
        },1300)
       }).catch((err)=>{
        toast.error(err.response.data.message)
       }).finally(()=>{
        setIsLoading(false)
      }
    )
  }

  function getUser(){
    axios.get("https://todo-app-backend-wine.vercel.app/users",{
        headers:{
            authorization:localStorage.getItem("Token")
        }
    }).then((res)=>{
        console.log(res.data)
        setUserData(res.data.user)
        localStorage.setItem("User" , JSON.stringify(res.data.user))    
    }).catch((err)=>{
        console.log(err)
    })
}


function getDueTasks(){
  axios.get("https://todo-app-backend-wine.vercel.app/tasks",{
      headers:{
        authorization:localStorage.getItem("Token")
      }
     }).then((res)=>{
       console.log(res.data)
       let tasks = res.data.tasks.filter((task)=>new Date(task.dueDate) < Date.now()).length
       setDueTasks(tasks)
     }).catch((err)=>{
      setDueTasks(0)
      console.log(err)
     })
}

return <>



<div className="min-h-screen grid md:grid-cols-2 ">
  <div className="left_cover relative hidden md:block">
     <img className="object-cover w-full h-full " src="./images/login_cover.svg" alt="signup cover"/>
     <div className="absolute w-full h-full end-0 top-0 ">
       <div className="logo flex justify-start items-center gap-1.5 m-10">
        <div className="logo_icon  flex justify-center w-11 h-11 rounded-xl bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] ">
          <img src="./images/logo.svg" alt="logo" className="w-5"/>
        </div>
          <h1 className="font-bold text-xl text-(--low-color)">Todo List</h1>
       </div>
     </div>
  </div>
  <div className="signup_form px-10 pt-35 md:px-20 lg:px-30  bg-(--low-color)">
    <Toaster toastOptions={{duration:1300, position:'bottom-right',
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

    <form onSubmit={handleSubmit(LoginFun)}>
     <div className="form_header mb-8">
        <h2 className="text-5xl font-semibold my-2.5">Welcome Back</h2>
        <p className="text-(--secondary-color) ">Your focus starts here. Sign in to continue your journey.</p>
     </div>
  

    <label htmlFor="input-group-1" className="block mb-1.5 mt-3.5 text-sm  text-(--secondary-color)">Email Address</label>
    <div className="relative">
    <input {...register("email")}  type="email" id="input-group-1" className="block w-full ps-4 pe-3 py-2.5 bg-[#fbfaf7] border border-default-medium text-sm rounded-base focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-xs placeholder:text-[#a6a6a4]" placeholder="julianne@example.com"/>
    {formState.errors.email &&<p className="text-sm text-(--secondary-color)/80 italic">{formState.errors.email.message}</p>}
    </div>


    <label htmlFor="input-group-2" className="block mb-1.5 mt-3.5 text-sm  text-(--secondary-color)">Password</label>
    <div className="relative">
    <input {...register("password")}  type="password" id="input-group-2" className="block w-full ps-4 pe-3 py-2.5 bg-[#fbfaf7] border border-default-medium text-sm rounded-base focus:ring-(--primary-color) focus:border-(--primary-color) shadow-xs placeholder:text-[#a6a6a4]" placeholder="••••••••••••"/>
    {formState.errors.password &&<p className="text-sm text-(--secondary-color)/80 italic">{formState.errors.password.message}</p>}
    </div>

    
    <button type="submit" className=" my-4 md:my-8 w-full text-(--low-color) bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] shadow-2xl shadow-[color:var(--primary-color)]/50  box-border border border-transparent cursor-pointer hover:bg-amber-800 focus:ring-4 focus:ring-(--primary-color)/20 font-medium leading-5 rounded-base text-sm px-4 py-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
    {isLoading? <span> <i className="fa fa-spin fa-spinner m-1"></i>Loading...</span>:"Sign In" }
    </button>

    <p className="text-center text-(--secondary-color)">New to Todo List? <Link to="/register" className="text-(--primary-color)">Create an account</Link></p>

    </form>
  </div>
</div>

  </>
}
