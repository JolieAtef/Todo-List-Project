import React, { useContext, useEffect } from "react";
import "./Layout.module.css"
import {Navbar} from "../Navbar/Navbar.jsx"
import { Link, Outlet, useNavigate } from "react-router-dom";
import {Footer} from "../Footer/Footer.jsx"
import { UserContext } from "../../Contexts/UserContext.jsx";

export function Layout() {

  let {token ,setToken} =useContext(UserContext)
  let navigate= useNavigate()

  useEffect(() => {
    initFlowbite()
  }, [])

  function signOut(){
    setToken("")
    localStorage.removeItem("Token")
    navigate("/")
  }


  return <>


<nav class="fixed top-0 z-50 w-full bg-[var(--low-color)] border-b border-default">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start rtl:justify-end">
        <a href="/home" class="flex ms-2 md:me-24">
        <div className="logo flex justify-center items-center gap-2">
        <div className="logo_icon  flex justify-center w-10 h-10 rounded-xl bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] ">
          <img src="./images/logo.svg" alt="logo" className="w-5"/>
        </div>
        <h1 className="font-bold text-xl">Todo List</h1>
       </div>
        </a>
      </div>
      <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div>
              <button type="button" class="flex justify-center items-center gap-3  text-sm  rounded-full cursor-pointer bg-[var(--medium-color)]/90 pe-4 p-0.5 text-[var(--low-color)]" aria-expanded="false" data-dropdown-toggle="dropdown-user">
              <div className="relative w-10 h-10 overflow-hidden bg-[var(--low-color)] rounded-full">
              <svg className="absolute w-12 h-12 text-[var(--secondary-color)]/65 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
              <h3>hiih</h3>
            </button>
            </div>
            <div class="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="dropdown-user">
              <div class="px-4 py-3 border-b border-default-medium" role="none">
                <p class="text-sm font-medium text-[var(--secondary-color)]" role="none">
                  Neil Sims
                </p>
                <p class="text-sm text-heading" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="p-2 text-sm text-[var(--secondary-color)] font-medium" role="none">
                <li>
                  <Link to="/profile" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem">Profile</Link>
                </li>
                <li>
                  <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" role="menuitem"><button onClick={()=>signOut}>Sign out</button></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="top-bar-sidebar" class="fixed top-15 left-0 z-40 w-64 h-full transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-[var(--low-color)] border-e border-default"> 
      <ul class="space-y-2 font-medium">
         <li>
            <a href="#" class="flex items-center px-2 py-1.5 text-[var(--secondary-color)] rounded-base hover:bg-[var(--primary-color)]/8 hover:text-[var(--medium-color)] group">
               <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
               <span class="ms-3">Home</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center px-2 py-1.5 text-[var(--secondary-color)] rounded-base hover:bg-[var(--primary-color)]/8 hover:text-[var(--medium-color)] group">
            <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"/></svg>               <span class="flex-1 ms-3 whitespace-nowrap">Tasks</span>
               <span class="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">2</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center px-2 py-1.5 text-[var(--secondary-color)] rounded-base hover:bg-[var(--primary-color)]/8 hover:text-[var(--medium-color)] group">
             <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
             <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
            </a>
         </li>
         <li>
            <a href="#" onClick={()=>signOut()} class="flex items-center px-2 py-1.5 text-[var(--secondary-color)] rounded-base hover:bg-[var(--primary-color)]/8 hover:text-[var(--medium-color)] group">
            <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l5-5-5-5M21 12H9M13 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></svg>               <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

<div className="mt-20 min-h-[77vh]">
      <Outlet/>
</div>

    

<div class="fixed z-50 w-full h-16 block md:hidden max-w-lg -translate-x-1/2 bg-neutral-primary-soft border border-default rounded-full bottom-4 left-1/2">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-neutral-secondary-medium group">
            <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
            <span class="sr-only">Home</span>
        </button>
        <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Home
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group">
        <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"/></svg>          
        <span class="sr-only">Tasks</span>
        </button>
        <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Tasks
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div class="flex items-center justify-center">
            <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center text-white bg-[var(--primary-color)] hover:[var(--primary-color)]/80  shadow-xs rounded-full w-8 h-8 focus:outline-none">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg>
                <span class="sr-only">New item</span>
            </button>
        </div>
        <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Create new item
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-neutral-secondary-medium group">
            <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
            <span class="sr-only">Profile</span>
        </button>
        <div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Profile
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button onClick={()=>signOut()} data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group">
        <svg class="w-6 h-6 mb-1 text-[var(--secondary-color)] group-hover:text-[var(--medium-color)]" aria-hidden="true"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l5-5-5-5M21 12H9M13 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></svg>            
        <span class="sr-only">Sign Out</span>
        </button>
        <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Sign Out
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>

    <Footer/>
  </>
}
