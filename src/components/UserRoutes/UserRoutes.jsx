import React from "react"
import { Navigate } from "react-router-dom"

export function UserRoutes(props) {
   
    if(localStorage.getItem("Token")!== null){
         return props.children
    }
    else{
        return <Navigate to="/login" />
    }
  
}