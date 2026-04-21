import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {z} from "zod"


let schema =z.object({
  title:z.string().min(3,"Title must be at least 3 characters"),
})

export function CollectionModal({isOpenAdd , isOpenUpdate , setIsOpenAdd , setIsOpenUpdate , currentCollection , collections , setCollections}){
 
  let {register , handleSubmit , formState , setValue}=useForm({
    defaultValues:{
      "title":"",
      "color":""
    },resolver:zodResolver(schema)
  })

  useEffect(()=>{
    if(isOpenUpdate){
      setValue("title", currentCollection.title)
      setValue("color", currentCollection.color)
    }else{
      setValue("title", "")
    }
  },[isOpenUpdate])


  function submit(data){
    if(isOpenAdd){
      addCollection(data)
    }else{
      updateCollection(data , currentCollection._id)
    }
  }
  
  function addCollection(data){
    axios.post("https://todo-app-backend-wine.vercel.app/categories", data, {
      headers:{
        authorization:localStorage.getItem("Token")
      }
    }).then((res)=>{
        toast.success(res.data.message)
        console.log(res.data.addedCategory)
        // collections.push(res.data.addedCategory)
        // console.log(collections)
        // setCollections(collections)
        setCollections(prev => [...prev, res.data.addedCategory])
    }).catch((err)=>{
         toast.error(err.response.data.message)
    }).finally(()=>{
      setIsOpenAdd(false)
    })
  }

  function updateCollection(data , id){
    console.log(currentCollection)
    axios.put(`https://todo-app-backend-wine.vercel.app/categories/${id}`, data, {
      headers:{
        authorization:localStorage.getItem("Token")
      }
    }).then((res)=>{
       toast.success(res.data.message)
       setCollections((prev)=>prev.map((collection)=>collection._id==id? res.data.updatedCategory:collection))
    }).catch((err)=>{
      toast.error(err.response.data.message) 
    }).finally(()=>{
      setIsOpenUpdate(false)
    })
  }


  

  return (
  <>

<div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isOpenAdd || isOpenUpdate ? 'flex' :'hidden'}  bg-gray-500/15 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                    {isOpenAdd? 'Create new collection': 'Update collection'}
                </h3>
                <button onClick={()=>{setIsOpenAdd(false) , setIsOpenUpdate(false)}}  type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Title</label>
                        <input {...register("title")} type="text"  id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-(--medium-color) focus:border-(--medium-color) block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Type collection title" />
                         {formState.errors.title && <p className="text-sm text-(--secondary-color)/80 italic">{formState.errors.title.message}</p>}
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="color" className="block  mb-2.5 text-sm font-medium text-heading">Color</label>
                        <input {...register("color")} type="color"  id="color" className="bg-neutral-secondary-medium border border-default-medium w-full h-12 rounded-base  block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="$2999" />
                    </div>     
                </div>
                <div className="flex justify-center border-t border-default pt-4 md:pt-6">
                    <button type="submit" className="flex justify-center items-center text-(--low-color) bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] box-border border border-transparent focus:ring-4 focus:ring-(--medium-color)/20 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                        {isOpenAdd? "+ Add new collection" :"Update collection"}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div> 


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
  </>);
}