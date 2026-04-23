import React, { useContext } from "react";
import "./Profile.module.css"
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function Profile() {
    let {userData , setToken}= useContext(UserContext)
    let navigate = useNavigate()

    function deleteAccount(){
        console.log(userData._id)
          Swal.fire({
              title: "Are you sure you want to delete your Account permanently?",
              showCancelButton: true,
              confirmButtonColor: "#B45309",
              cancelButtonColor: "#c5a270",
              confirmButtonText: "Yes, delete"
            }).then((result) => {
              if (result.isConfirmed) {     
              axios.delete("https://todo-app-backend-wine.vercel.app/users/delete_account",{
                headers:{
                    authorization:localStorage.getItem("Token")
                }
              }).then((err)=>{
                  setToken("")
                  localStorage.removeItem("Token")
                  localStorage.removeItem("User")
                  navigate("/register")
                }).catch((err)=>{
                    console.log(err)
                })}
               }
              )}

  return <>
    
    <div className="">
    <div className="relative mx-auto my-4 w-42 h-42 overflow-hidden bg-(--low-color) rounded-full border border-4 border-(--secondary-color) bg-white">
        <svg className="absolute w-50 h-50 text-(--secondary-color)/65 -left-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>
    </div>
    

<div className="relative mx-auto bg-neutral-primary-soft w-9/10 md:max-w-md  p-6 border border-default rounded-base shadow-xs">
            <div>
            <h6 className="text-(--medium-color)">NAME</h6>
            <p className="p-3 my-3 rounded-2xl bg-(--secondary-color)/10 text-(--secondary-color)">{userData.name}</p>
            </div>
            <div className="mt-3">
            <h6 className="text-(--medium-color)">EMAIL</h6>
            <p className="p-3 my-3 rounded-2xl bg-(--secondary-color)/10 text-(--secondary-color)">{userData.email}</p>
            </div>
            <button onClick={()=>deleteAccount()} type="button" className="block mt-10 mx-auto self-start w-auto text-danger-strong bg-neutral-secondary-medium box-border border border-danger-strong hover:bg-danger-strong hover:text-neutral-secondary-medium  shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
                Delete Account
            </button>
       
   
</div>

  </>
}
