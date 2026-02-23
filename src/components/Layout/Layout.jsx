import React from "react";
import "./Layout.module.css"
import {Navbar} from "../Navbar/Navbar.jsx"
import { Outlet } from "react-router-dom";
import {Footer} from "../Footer/Footer.jsx"

export function Layout() {
  return <>
    <Navbar/>
    <div className="mt-20 min-h-[77vh]">
       <Outlet/>
    </div>
    <Footer/>
  </>
}
