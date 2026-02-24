import React,{useEffect, useState} from "react";
import "./Home.module.css"
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'


let schema = z.object({
  title:z.string().min(3,"Title must be at least 3 charcters").max(30,"Title must be at most 30 charcters"),
  description:z.string().min(10,"Title must be at least 10 charcters").max(300,"Title must be at most 300 charcters")
})

export function Home() {

let [todos ,setTodos]=useState([])
let [isLoading, setIsLoading]=useState(false)
let [isOpen,setIsOpen]=useState(false)
let [currentTodo,setCurrentTodo]=useState({})

useEffect(()=>{
  getTodos()
},[])

// let {formState, register,handleSubmit,reset}=useForm({
//     defaultValues:
//     {
//       title:"",
//       description:"",
//     },
//     resolver: zodResolver(schema),
// })

//  Add Form
const {
  formState: addFormState,
  register: registerAdd,
  handleSubmit: handleSubmitAdd,
  reset: resetAdd,
} = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  resolver: zodResolver(schema),
})


// Update Form
const {
  formState: updateFormState,
  register: registerUpdate,
  handleSubmit: handleSubmitUpdate,
  reset: resetUpdate,
} = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  resolver: zodResolver(schema),
})

function getTodos(){
  axios.get("https://todo-nti.vercel.app/todo/get-all",{
    headers:{
      token:localStorage.getItem("Token")
    }
  }).then((res)=>{
    setTodos(res.data.todos)
  }).catch((err)=>{
    console.log(err.message)
  })
}

function AddTodo(data){
  setIsLoading(true)
  axios.post("https://todo-nti.vercel.app/todo/create",data,{
    headers:{
      token:localStorage.getItem("Token")
    }
  }).then((res)=>{
    toast.success(res.data.message)
    resetAdd()
    getTodos()
  }).catch((err)=>{
    console.log(err.message)
    toast.error(err.message);
  }).finally(()=>{
    setIsLoading(false)
  })
}

function deleteTodo(todoId){
  Swal.fire({
    title: "Are you sure?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) { 
      axios.delete(`https://todo-nti.vercel.app/todo/delete-todo/${todoId}`,{
        headers:{
          token:localStorage.getItem("Token")
        }
      }).then(()=>{
        Swal.fire({
          title: "Deleted!",
          text: "Your Todo has been deleted.",
          icon: "success"
        });
        getTodos()
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  });
}

function setupUpdate(todo){
  console.log(todo)
  setIsOpen(true)
  setCurrentTodo(todo)
  resetUpdate({
    title: todo.title,
    description: todo.description
  })
}

function todoUpdate(data){
  axios.patch(`https://todo-nti.vercel.app/todo/update-todo/${currentTodo._id}`,data,{
    headers:{
      token:localStorage.getItem("Token")
    }
  }).then((res)=>{
    toast.success(res.data.message)
    getTodos()
  }).catch((err)=>{
     console.log(err.message)
  }).finally(()=>{
    setIsOpen(false)
  })
}

return <>
<div className="pt-8">
<form className="w-full md:w-[40%]  mx-auto py-10  px-15 shadow-2xl rounded-xl" onSubmit={handleSubmitAdd(AddTodo)}>
  <h2 className="text-3xl font-semibold my-4 text-center">Create New ToDo</h2>
  
  <div className="relative z-0 w-full mb-5 group">
      <input {...registerAdd("title")} type="title" id="floating_title" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
      <label htmlFor="floating_title" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Title</label>
      {addFormState.errors.title &&<p className="text-red-500">{addFormState.errors.title.message}</p>}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <textarea {...registerAdd("description")} id="floating_description" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
      <label htmlFor="floating_description" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Description</label>
      {addFormState.errors.description &&<p className="text-red-500">{addFormState.errors.description.message}</p>}
  </div>
  
  <button type="submit" className=" my-2 w-full text-white bg-brand box-border border border-transparent cursor-pointer hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
    {isLoading? <span><i className="fa fa-spin fa-spinner m-1"></i>Loading...</span>:"+ Add" }
  </button>
  <Toaster position='top-right' duration="200"/>

</form>


<div className="container mx-auto px-4 py-8">
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    
    {todos.map((todo) => (
      <div key={todo._id} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{todo.title}</h2>
         <p className="text-gray-600 mb-6">{todo.description} </p>      
        <div className="flex justify-center gap-3">
          <button className="px-4 py-2 bg-red-500 font-semibold text-white rounded-xl hover:bg-red-600 transition" onClick={() => deleteTodo(todo._id)}>Delete</button>
          <button className="px-4 py-2 bg-amber-500 font-semibold text-white rounded-xl hover:bg-amber-600 transition" onClick={() => setupUpdate(todo)}> Update </button>
        </div>
      </div>
    ))}

  </div>
</div>





<div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? "flex" : "hidden"}`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
            
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                    Update ToDo
                </h3>
                <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal" onClick={()=>setIsOpen(false)}>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
          
            <form action="#">
                <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                    <div className="col-span-2">
                        <label htmlFor="title" className="block mb-2.5 text-sm font-medium text-heading">Title</label>
                        <input type="text"{...registerUpdate("title")} name="title" id="title" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
                        {updateFormState.errors.title &&<p className="text-red-500">{updateFormState.errors.title.message}</p>}
                    </div>
                   
                    <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Description</label>
                        <textarea id="description" {...registerUpdate("description")} rows="4" className="block bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" ></textarea>
                        {updateFormState.errors.description &&<p className="text-red-500">{updateFormState.errors.description.message}</p>}                    
                    </div>
                </div>
                <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                    <button type="submit" className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={handleSubmitUpdate(todoUpdate)} data-modal-target="crud-modal">
                        <svg className="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/></svg>
                        Update
                    </button>
                    <button data-modal-hide="crud-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={()=>setIsOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div> 

</div> 
  </>
}
