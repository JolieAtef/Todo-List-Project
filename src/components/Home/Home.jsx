import React,{useEffect, useState} from "react";
import "./Home.module.css"
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { CollectionModal } from "../modals/CollectionModal";

let schema = z.object({
    title:z.string().min(3,"Title must be at least 3 characters").max(30,"Title must be at most 30 characters"),
    description:z.string().min(10,"Title must be at least 10 characters").max(300,"Title must be at most 300 characters")
})

export function Home() {

    let [isLoading, setIsLoading]=useState(false)
    let [isOpenAdd,setIsOpenAdd]=useState(false)
    let [isOpenUpdate , setIsOpenUpdate]= useState(false)
    let [isOpenDelete , setIsOpenDelete]= useState(false)
    let [collections , setCollections]=useState("")
    let [currentCollection ,setCurrentCollection]=useState("")
   
    

    useEffect(()=>{
      setIsLoading(true)
      getCollections()
    },[])


    function getCollections(){
        axios.get("https://todo-app-backend-wine.vercel.app/categories",{
          headers:{
            authorization:localStorage.getItem("Token")
          }
        }).then((res)=>{
          setCollections(res.data.categories)
          console.log(res.data)
        }).catch((err)=>{
          console.log(err)
          setCollections("")
        }).finally(()=>{
           setIsLoading(false)
        })
      }


    function deleteCollection(id){
        axios.delete(`https://todo-app-backend-wine.vercel.app/categories/${id}`,{
           headers:{
               authorization:localStorage.getItem("Token")
           }
        }).then((res)=>{
           console.log(res.data.message)
        }).catch((err)=>{
           console.log(err)
        }).finally(()=>{
          setIsOpenDelete(false)
          getCollections()
        })
    }

  
  return (
  
  <>
<div className="px-8 py-8">
 {isLoading?<Loading/>:

<div className="collection">

    <div className="home_header flex justify-between items-center flex-col md:flex-row gap-3">
    <div>
      <h2 className="font-semibold text-4xl pt-5 pb-1">My Collections</h2>
      <p className="text-(--secondary-color) pb-4">Curate your workflows with high-focus task collections designed for clarity.</p>
    </div>
    <div>
    <button onClick={()=>setIsOpenAdd(true)} type="button" className=" my-4 md:my-8 w-full text-(--low-color) bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] shadow-2xl shadow-(color:--primary-color)/50  box-border border border-transparent cursor-pointer hover:bg-amber-800 focus:ring-4 focus:ring-(--primary-color)/20 font-medium leading-5 rounded-base text-sm px-4 py-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" disabled={isLoading}>
     + Add New Collection
    </button>
    </div>
    </div>

{  collections ? 
   <div>
   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center pt-5"> 
   {
     collections.map((collection)=>( 
    <div style={{"--card-color": collection.color }} className="bg-(--card-color)/20 block max-w-sm p-6 border border-default rounded-base hover:shadow-2xl hover:-translate-y-1 transition-all duration-200" key={collection._id} >
    <p className="mb-3 text-3xl font-semibold tracking-tight text-heading leading-8">{collection.title}</p>
    <p className="text-(--secondary-color) mb-6">{`${collection.categoryTasks?.length || 0} Active Tasks`}</p>
    <div className="collection_footer flex justify-between">
    <div className="btns flex gap-2">
    <button  onClick={()=>{setIsOpenUpdate(true) , setCurrentCollection(collection)}} type="button" className="inline-flex items-center justify-center  text-(--secondary-color) bg-(--low-color) hover:-translate-y-1 transition-all duration-150 hover:shadow-amber-900 shadow-xs rounded-full w-9 h-9 focus:outline-none cursor-pointer">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M1.66667 13.3333H2.85417L11 5.1875L9.8125 4L1.66667 12.1458V13.3333ZM0 15V11.4583L11 0.479167C11.1667 0.326389 11.3507 0.208333 11.5521 0.125C11.7535 0.0416667 11.9653 0 12.1875 0C12.4097 0 12.625 0.0416667 12.8333 0.125C13.0417 0.208333 13.2222 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.809 2 14.8854 2.20833C14.9618 2.41667 15 2.625 15 2.83333C15 3.05556 14.9618 3.26736 14.8854 3.46875C14.809 3.67014 14.6875 3.85417 14.5208 4.02083L9.03125 9.51042L3.54167 15H0ZM10.3958 4.60417L9.8125 4L11 5.1875L10.3958 4.60417Z" fill="#564338"/>
    </svg>
     </button>

    <button onClick={()=>{setIsOpenDelete(true) , setCurrentCollection(collection)}} type="button" className="inline-flex items-center justify-center  text-(--secondary-color) bg-(--low-color) hover:-translate-y-1 transition-all duration-150 hover:shadow-amber-900  shadow-xs rounded-full w-9 h-9 focus:outline-none cursor-pointer">
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 15C2.04167 15 1.64931 14.8368 1.32292 14.5104C0.996528 14.184 0.833333 13.7917 0.833333 13.3333V2.5H0V0.833333H4.16667V0H9.16667V0.833333H13.3333V2.5H12.5V13.3333C12.5 13.7917 12.3368 14.184 12.0104 14.5104C11.684 14.8368 11.2917 15 10.8333 15H2.5ZM10.8333 2.5H2.5V13.3333H10.8333V2.5ZM4.16667 11.6667H5.83333V4.16667H4.16667V11.6667ZM7.5 11.6667H9.16667V4.16667H7.5V11.6667ZM2.5 2.5V13.3333V2.5Z" fill="#564338"/>
    </svg>
     </button>
     </div>
     
    <Link  to={`${collection._id}`} className="inline-flex items-center text-(--secondary-color) box-border  font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none group">
        Details
        <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5 group-hover:translate-x-1 transition-all duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
    </Link>
    </div>



      </div>
     ))
    }
   </div>

    <div  tabIndex="-1" className={`${isOpenDelete? "flex" : "hidden"} overflow-y-auto overflow-x-hidden bg-gray-400/45 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  min-h-screen `} >
         <div className="relative p-4 w-full max-w-md max-h-full">
         <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                <button onClick={()=>setIsOpenDelete(false)} type="button" className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <h3 className="mb-6 text-body">Are you sure you want to delete this collection from your list?</h3>
                <div className="flex items-center space-x-4 justify-center">
                    <button onClick={()=>{deleteCollection(currentCollection._id)}} data-modal-hide="popup-modal" type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer">
                    Yes, I'm sure
                    </button>
                    <button onClick={()=>setIsOpenDelete(false)} data-modal-hide="popup-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer">No, cancel</button>
                </div>
            </div>
        </div>
    </div>
    </div>
   
    

   </div>: 
   <div>
    <p className="flex justify-center items-center pt-50">No Collections Found</p>
   </div>
}

  <CollectionModal isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} currentCollection={currentCollection}  getCollections={getCollections}/>
</div>
}


</div>
  </>
  );
}