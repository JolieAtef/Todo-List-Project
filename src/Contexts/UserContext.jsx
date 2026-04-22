import axios from 'axios';
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';


export let UserContext = createContext()

export default function UserContextProvider(props){
    let[token , setToken]=useState("")
    let[userData,setUserData]=useState({})
    let[dueTasks , setDueTasks]=useState(0)

    useEffect(()=>{    
        if(localStorage.getItem("Token")){
            setToken(localStorage.getItem("Token"))
        }
        getUser()
        getDueTasks()
    },[])
    
    function getUser(){
        axios.get("https://todo-app-backend-wine.vercel.app/users",{
            headers:{
                authorization:localStorage.getItem("Token")
            }
        }).then((res)=>{
            console.log(res.data)
            setUserData(res.data.user)
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
            console.log(err)
           })
    }
    return (
        <UserContext.Provider value={{token,setToken,userData,dueTasks , setDueTasks}}>
            {props.children}
        </UserContext.Provider>
    )

}
