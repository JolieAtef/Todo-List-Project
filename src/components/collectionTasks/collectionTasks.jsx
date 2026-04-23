import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { TaskItem } from "../TaskItem/TaskItem";
import { UserContext } from "../../Contexts/UserContext";


export function CollectionTasks() {
  const { id } = useParams();
  let {dueTasks , setDueTasks}= useContext(UserContext)
  let[category , setCategory]=useState("")
  let[collections , setCollections]=useState("")
  let[isLoading , setIsLoading]=useState(false)
  let[isOpenAdd , setIsOpenAdd]=useState(false)
  

  useEffect(()=>{
    setIsLoading(true)
    getCategory()
    getCollections()
  },[])
 
  function getCategory(){
      axios.get(`https://todo-app-backend-wine.vercel.app/tasks/category/${id}`,{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        console.log(res.data.category.categoryTasks)
        setCategory(res.data.category)
      }).catch((err)=>{
        console.log()
      }).finally(()=>{
        setIsLoading(false)
      })
  }

  
  function toggleTask(id){
    if(category.categoryTasks.find((task)=>task._id == id).isCompleted){
      axios.put(`https://todo-app-backend-wine.vercel.app/tasks/incomplete/${id}`,{},{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        let updatedTask = res.data.inCompletedTask
        setCategory((prev)=>({
          ...prev , categoryTasks:prev.categoryTasks.map((task)=> task._id === updatedTask._id? updatedTask :task)
        }))
      }).catch((err)=>{
        console.log(err.response.data.message)
      })  
    }else{
      axios.put(`https://todo-app-backend-wine.vercel.app/tasks/complete/${id}`,{},{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        let updatedTask = res.data.completedTask
        setCategory((prev)=>({
          ...prev , categoryTasks:prev.categoryTasks.map((task)=> task._id === updatedTask._id? updatedTask :task)
        }))
      }).catch((err)=>{
        console.log(err.response.data.message)
      })  
    }
  }
  
  function deleteTask(id){
    let task = category.categoryTasks.find((task)=>task._id == id)
    let isDueDate = new Date(task.dueDate) < Date.now()
    console.log(isDueDate)
    axios.delete(`https://todo-app-backend-wine.vercel.app/tasks/${id}`,{
      headers:{
        authorization:localStorage.getItem("Token")
      }
    }).then((res)=>{
      getCategory()
      if(isDueDate){
        setDueTasks(dueTasks-1)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }


  function getCollections(){
    axios.get("https://todo-app-backend-wine.vercel.app/categories",{
      headers:{
        authorization:localStorage.getItem("Token")
      }
    }).then((res)=>{
      console.log(res.data)
      setCollections(res.data.categories)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
  <>
   {isLoading?<Loading/>:
   <div>
    <div className="header bg-[linear-gradient(to_top,rgba(255,255,255,0.8),rgba(255,255,255,0.1)),url('/images/Container.svg')]  bg-no-repeat bg-center bg-cover h-60 relative">
      <div className="absolute bottom-0  start-10 end-15 flex flex-col md:flex-row justify-between ">
      <div className="">
      <h3 className="text-6xl font-semibold tracking-tight text-heading leading-8 mb-5">{category.title}</h3>
      <p className="text-(--secondary-color) mb-6 px-2 rounded-full bg-(--low-color) w-30 border border-1 border-(--secondary-color)">{`${category.categoryTasks?.length || 0} Active Tasks`}</p>
      </div>
      <button onClick={()=>setIsOpenAdd(true)} type="button" className=" my-4 md:my-8  text-(--low-color) bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] shadow-2xl shadow-(color:--primary-color)/70  box-border border border-transparent cursor-pointer hover:bg-amber-800 focus:ring-4 focus:ring-(--primary-color)/20 font-medium leading-5 rounded-base text-sm px-4 py-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
      + Add New Task
    </button>
      </div>
    </div>
    <div className="tasks p-10">
        {category.categoryTasks?.map((task)=>(
         <TaskItem task={task} toggleTask={toggleTask} deleteTask={deleteTask} setCategory={setCategory} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} category={category._id} collections={collections} getCategory={getCategory}/>
        ))}
    </div> 

    <TaskItem  setCategory={setCategory} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} category={category._id}/>
   </div>
  }


  </>);
}