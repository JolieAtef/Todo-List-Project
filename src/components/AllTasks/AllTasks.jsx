import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { TaskItem } from "../TaskItem/TaskItem";


export function AllTasks() {
  let [tasks , setTasks]= useState("")
  let [isLoading ,setIsLoading]= useState(false)
  useEffect(()=>{
   getTasks()
  },[])

  function getTasks(){
     setIsLoading(true)
     axios.get("https://todo-app-backend-wine.vercel.app/tasks",{
      headers:{
        authorization:localStorage.getItem("Token")
      }
     }).then((res)=>{
       console.log(res.data)
       setTasks(res.data.tasks)
     }).catch((err)=>{
      console.log(err)
     }).finally(()=>{
      setIsLoading(false)
     })
  }

  function toggleTask(id){
    if(tasks.find((task)=>task._id == id).isCompleted){
      axios.put(`https://todo-app-backend-wine.vercel.app/tasks/incomplete/${id}`,{},{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        console.log(res.data)
        let updatedTask = res.data.inCompletedTask;
        setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
        );
      }).catch((err)=>{
        console.log(err.response.data.message)
      })  
    }else{
      axios.put(`https://todo-app-backend-wine.vercel.app/tasks/complete/${id}`,{},{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        let updatedTask = res.data.completedTask;
        setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
        );
      }).catch((err)=>{
        console.log(err.response.data.message)
      })  
    }
  }


  function deleteTask(id){
    axios.delete(`https://todo-app-backend-wine.vercel.app/tasks/${id}`,{
       headers:{
           authorization:localStorage.getItem("Token")
       }
    }).then((res)=>{
       console.log(res.data.message)
       setTasks(tasks.filter((task)=>task._id != id))
    }).catch((err)=>{
       console.log(err)
    })
}

  return (
  <>
  {isLoading?<Loading/>:
  <div>
   {!tasks?<p className="text-2xl text-center font-medium mt-50">No Tasks Found</p>:
   <div>

    {tasks.map((task)=>(
      <TaskItem task={task} tasks={tasks} setTasks={setTasks} toggleTask={toggleTask} deleteTask={deleteTask}/>
    ))}
   </div>
   }
  </div>}

  
  </>);
}