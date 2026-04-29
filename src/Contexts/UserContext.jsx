import axios from 'axios';
import React from 'react';
import { createContext, useEffect, useState } from 'react';



export let UserContext = createContext()

export default function UserContextProvider(props){
    let[token , setToken]=useState("")
    let[userData,setUserData]=useState({})
    let[dueTasks , setDueTasks]=useState(0)

    useEffect(()=>{    
        if(localStorage.getItem("Token")){
            setToken(localStorage.getItem("Token"))
        }
        if(localStorage.getItem("User")){
            setUserData(JSON.parse(localStorage.getItem("User")))
        }
        
    },[])
    
  

    
    return (
        <UserContext.Provider value={{token,setToken,userData , setUserData ,dueTasks , setDueTasks}}>
            {props.children}
        </UserContext.Provider>
    )

}
