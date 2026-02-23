import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';


export let UserContext = createContext()

export default function UserContextProvider(props){
    let[token , setToken]=useState("")
    let[userData,setUserData]=useState({})

    useEffect(()=>{    
        if(localStorage.getItem("Token")){
            setToken(localStorage.getItem("Token"))
        }
        if(localStorage.getItem("UserData")){
            setUserData(JSON.parse(localStorage.getItem("UserData")))
        }
    },[])

    return (
        <UserContext.Provider value={{token,setToken,userData,setUserData}}>
            {props.children}
        </UserContext.Provider>
    )

}
