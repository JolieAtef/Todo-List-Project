import React, { useContext, useEffect } from "react";
import "./Layout.module.css"
import { Link, Outlet, useNavigate } from "react-router-dom";
import {Footer} from "../Footer/Footer.jsx"
import { UserContext } from "../../Contexts/UserContext.jsx";
import Swal from "sweetalert2";

export function Layout() {

  let {token ,setToken , userData , dueTasks } =useContext(UserContext)
  
  let navigate= useNavigate()

  useEffect(() => {
    initFlowbite()
  }, [])

  function signOut(){
    Swal.fire({
      title: "Do you want to sign out?",
      showCancelButton: true,
      confirmButtonColor: "#B45309",
      cancelButtonColor: "#c5a270",
      confirmButtonText: "Sure"
    }).then((result) => {
      if (result.isConfirmed) {     
        setToken("")
        localStorage.removeItem("Token")
        navigate("/")
      }})
  }


  return <>


<nav className="fixed top-0 z-50 w-full bg-(--low-color) border-b border-default">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <a href="/home" className="flex ms-2 md:me-24">
        <div className="logo flex justify-center items-center gap-2">
        <div className="logo_icon  flex justify-center items-center w-10 h-10 rounded-xl bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] ">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M3.55 15.075L0 11.525L1.4 10.125L3.525 12.25L7.775 8L9.175 9.425L3.55 15.075ZM3.55 7.075L0 3.525L1.4 2.125L3.525 4.25L7.775 0L9.175 1.425L3.55 7.075ZM11 13.075V11.075H20V13.075H11ZM11 5.075V3.075H20V5.075H11Z" fill="white"/>
        </svg>
        </div>
        <h1 className="font-bold text-xl">Todo List</h1>
       </div>
        </a>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex justify-center items-center gap-3  text-sm  rounded-full cursor-pointer bg-(--primary-color)/90 pe-4 p-0.5 text-(--low-color)" aria-expanded="false" data-dropdown-toggle="dropdown-user">
              <div className="relative w-10 h-10 overflow-hidden bg-(--low-color) rounded-full">
              <svg className="absolute w-12 h-12 text-(--secondary-color)/65 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
              <h3>{userData.name}</h3>
            </button>
            </div>
            <div className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="dropdown-user">
              <div className="px-4 py-3 border-b border-default-medium" role="none">
                <p className="text-sm font-medium text-(--secondary-color)" role="none">
                 {userData.name}
                </p>
                <p className="text-sm text-heading" role="none">
                  {userData.email}
                </p>
              </div>
              <ul className="p-2 text-sm text-(--secondary-color) font-medium" role="none">
                <li>
                  <Link to="/profile" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Profile</Link>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem"><button onClick={()=>signOut}>Sign out</button></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="top-bar-sidebar" className="fixed top-15 left-0 z-40 w-64 h-full transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-[#F6F3EE] border-e border-default"> 
      <ul className="space-y-2 font-medium">
         <li>
            <Link to="/home" className="flex items-center px-2 py-1.5 text-(--secondary-color) rounded-base hover:bg-neutral-primary-soft hover:text-(--medium-color) group">
               <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
               <span className="ms-3">Home</span>
            </Link>
         </li>
         <li>
            <Link to="/tasks" className="flex items-center px-2 py-1.5 text-(--secondary-color) rounded-base hover:bg-neutral-primary-soft hover:text-(--medium-color) group">
            <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"/></svg>               
            <span className="flex-1 ms-3 whitespace-nowrap">Tasks</span>
               <span className="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">{dueTasks}</span>
            </Link>
         </li>
         <li>
            <Link to="/profile" className="flex items-center px-2 py-1.5 text-(--secondary-color) rounded-base hover:bg-neutral-primary-soft hover:text-(--medium-color) group">
             <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
             <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
            </Link>
         </li>
         <li>
            <a href="#" onClick={()=>signOut()} className="flex items-center px-2 py-1.5 text-(--secondary-color) rounded-base hover:bg-neutral-primary-soft hover:text-(--medium-color) group">
            <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l5-5-5-5M21 12H9M13 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></svg>               <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

<div className="py-17  md:ps-64 min-h-[77vh] bg-(--low-color)">
      <Outlet className="bg-(--low-color)"/>
</div>

    

<div className="fixed z-50 w-full h-16 block md:hidden max-w-lg -translate-x-1/2 bg-neutral-primary-soft border border-default rounded-full bottom-4 left-1/2">
    <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Link to="/home" data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
            <span className="sr-only">Home</span>
        </Link>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link to="/tasks" data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group">
        <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"/></svg>          
        <span className="sr-only">Tasks</span>
        </Link>
        <div id="tooltip-wallet" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Tasks
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link to="/profile" data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
            <span className="sr-only">Profile</span>
        </Link>
        <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button onClick={()=>signOut()} data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group">
        <svg className="w-6 h-6 mb-1 text-(--secondary-color) group-hover:text-(--medium-color)" aria-hidden="true"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l5-5-5-5M21 12H9M13 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></svg>            
        <span className="sr-only">Sign Out</span>
        </button>
        <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Sign Out
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>

    {/* <Footer/> */}
  </>
}
