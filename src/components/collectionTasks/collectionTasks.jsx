import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { TaskItem } from "../TaskItem/TaskItem";


export function CollectionTasks() {
  const { id } = useParams();
  let[category , setCategory]=useState("")
  let[isLoading , setIsLoading]=useState(false)

  useEffect(()=>{
    getCategory()
  },[])
 
  function getCategory(){
    setIsLoading(true)
      axios.get(`https://todo-app-backend-wine.vercel.app/tasks/category/${id}`,{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        console.log(res.data)
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

  return (
  <>
   {isLoading?<Loading/>:
   <div>
    <div className="header   bg-[linear-gradient(to_top,rgba(255,255,255,0.8),rgba(255,255,255,0.1)),url('/images/Container.svg')]  bg-no-repeat bg-center bg-cover h-60 relative">
      <div className="absolute bottom-0 start-10">
      <h3 className="text-6xl font-semibold tracking-tight text-heading leading-8 mb-5">{category.title}</h3>
      <p className="text-[var(--secondary-color)] mb-6 px-2 rounded-full bg-[var(--low-color)] w-30 border border-1 border-[var(--secondary-color)]">{`${category.categoryTasks?.length || 0} Active Tasks`}</p>
      </div>
    </div>
    <div className="tasks p-10">
        {category.categoryTasks?.map((task)=>(
         <TaskItem task={task} toggleTask={toggleTask}/>
        ))}
    </div> 
   </div>
  }

  </>);
}