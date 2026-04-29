
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {z} from "zod"
import { UserContext } from "../../Contexts/UserContext";


let schema =z.object({
  title:z.string().min(3,"Title must be at least 3 characters"),
  description:z.string().min(5 ,"Description must be at least 5 characters").optional(),
  priority:z.enum(["low", "medium", "high"]).optional(),
  dueDate:z.string().optional()

})

export function TaskModal({isOpenAdd , isOpenUpdate , setIsOpenAdd , setIsOpenUpdate , currentTask , tasks , setTasks , setCategory , category}){
  
  let{dueTasks, setDueTasks} = useContext(UserContext)

  let {register , handleSubmit , formState , setValue}=useForm({
    defaultValues:{
      "title":"",
      "description":"",
      "priority":"",
      "dueDate":""
    },resolver:zodResolver(schema)
  })

  useEffect(()=>{
    if(isOpenUpdate){
      setValue("title", currentTask.title)
      setValue("description", currentTask.description)
      setValue("priority",currentTask.priority)
      setValue("dueDate",currentTask.dueDate)
    }else{
      setValue("title","")
      setValue("description", "")
      setValue("priority","")
      setValue("dueDate","")
    }
  },[isOpenUpdate])


  function submit(data){
    if(isOpenAdd){
      addTask(data)
    }else{
      updateTask(data , currentTask._id)
    }
  }
  
  function addTask(data){
    axios.post("https://todo-app-backend-wine.vercel.app/tasks", {category,...data}, {
      headers:{
        authorization:localStorage.getItem("Token")
      }
    }).then((res)=>{
        toast.success(res.data.message)
        setCategory((prev)=>({
          ...prev , categoryTasks:[...prev.categoryTasks, res.data.addedTask]
        }))
        if(new Date(res.data.addedTask.dueDate) < Date.now()){
          setDueTasks(dueTasks+1)
        }
    }).catch((err)=>{
         toast.error(err.response.data.message)
    }).finally(()=>{
      setIsOpenAdd(false)
    })
  }

  function updateTask(data , id){
    axios.put(`https://todo-app-backend-wine.vercel.app/tasks/${id}`, data, {
      headers:{
        authorization:localStorage.getItem("Token")
      }
    }).then((res)=>{
       toast.success(res.data.message)
       let updatedTask = res.data.updatedTask
       if(tasks){
         setTasks((prev)=>prev.map((task)=>task._id == updatedTask._id? updatedTask: task)) 
       }else{
         setCategory((prev)=>({
           ...prev , categoryTasks:prev.categoryTasks.map((task)=> task._id === updatedTask._id? updatedTask :task)
          }))
       }
       
    }).catch((err)=>{
      toast.error(err.response.data.message) 
    }).finally(()=>{
      setIsOpenUpdate(false)
    })
  }


  

  return (
  <>

<div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isOpenAdd || isOpenUpdate ? 'flex' :'hidden'}  bg-gray-400/45 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  min-h-screen `}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                    {isOpenAdd? 'Create New Task': 'Update Task'}
                </h3>
                <button onClick={()=>{tasks? setIsOpenUpdate(false) : setIsOpenAdd(false) , setIsOpenUpdate(false)}}  type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Title</label>
                        <input {...register("title")} type="text"  id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-(--medium-color) focus:border-(--medium-color) block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Type task title" />
                         {formState.errors.title && <p className="text-sm text-(--secondary-color)/80 italic">{formState.errors.title.message}</p>}
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Description</label>
                        <input {...register("description")} type="text"  id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-(--medium-color) focus:border-(--medium-color) block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Type task description" />
                         {formState.errors.description && <p className="text-sm text-(--secondary-color)/80 italic">{formState.errors.description.message}</p>}
                    </div>
                    <div className="col-span-2 ">
                        <label htmlFor="priority" className="block mb-2.5 text-sm font-medium text-heading">Priority</label>
                        <select {...register("priority")}  id="priority" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-(--medium-color) px-3 py-2.5 shadow-xs placeholder:text-body">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="date" className="block  mb-2.5 text-sm font-medium text-heading">Due Date</label>
                        <input {...register("dueDate")} type="date"  id="date" className="bg-neutral-secondary-medium border border-default-medium w-full h-12 rounded-base focus:ring-(--medium-color) block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                        {formState.errors.dueDate && <p className="text-sm text-(--secondary-color)/80 italic">{formState.errors.dueDate.message}</p>}
                    </div>     
                </div>
                <div className="flex justify-center border-t border-default pt-4 md:pt-6">
                    <button type="submit" className="flex justify-center items-center text-(--low-color) bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] box-border border border-transparent focus:ring-4 focus:ring-(--medium-color)/20 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                        {isOpenAdd? "+ Add new task" :"Update task"}
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