import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { TaskItem } from "../TaskItem/TaskItem";
import { UserContext } from "../../Contexts/UserContext";


export function AllTasks() {
  let {dueTasks , setDueTasks}= useContext(UserContext)
  let [tasks , setTasks]= useState("")
  let [isLoading ,setIsLoading]= useState(false)
  let [collections , setCollections]=useState("")
  let [category , setCategory]=useState("")
  let [priority , setPriority]=useState("")
  let [complete , setComplete] = useState("")

  useEffect(()=>{
   setIsLoading(true)
   getTasks()
   getCollections()
  },[])

  useEffect(()=>{
    getTasks()
  }, [category , priority , complete])

  function getTasks(){
     axios.get(`https://todo-app-backend-wine.vercel.app/tasks?isCompleted=${complete}&category=${category}&priority=${priority}`,{
      headers:{
        authorization:localStorage.getItem("Token")
      }
     }).then((res)=>{
       console.log(res.data)
       setTasks(res.data.tasks)
     }).catch((err)=>{
      setTasks("")
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
        getTasks()
      }).catch((err)=>{
        console.log(err.response.data.message)
      })  
    }else{
      axios.put(`https://todo-app-backend-wine.vercel.app/tasks/complete/${id}`,{},{
        headers:{
          authorization:localStorage.getItem("Token")
        }
      }).then((res)=>{
        console.log(res.data)
        getTasks()
      }).catch((err)=>{
        console.log(err.response.data.message)
      })  
    }
  }


  function deleteTask(id){
    let task = tasks.find((task)=>task._id == id)
    let isDueDate = new Date(task.dueDate) < Date.now()
    axios.delete(`https://todo-app-backend-wine.vercel.app/tasks/${id}`,{
       headers:{
           authorization:localStorage.getItem("Token")
       }
    }).then((res)=>{
       console.log(res.data.message)
       if(isDueDate){
        setDueTasks(dueTasks-1)
       }
      getTasks()
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

   
    <div className="px-8 py-3" >
      <h2 className="font-semibold text-4xl pt-5 pb-1">All Tasks</h2>
      <div className="flex lg:justify-between flex-col  lg:flex-row">
      <p className="text-(--secondary-color) pb-4">Curate your workflow. Focus on what truly matters today.</p>
      <div className="flex items-center justify-center py-1.5 gap-0.5 bg-(--secondary-color)/8 flex-wrap  rounded-2xl w-fit ">
      <button onClick={()=>{setComplete(""), setPriority(""), setCategory("")}} type="button" className="text-(--secondary-color) shadow bg-neutral-primary focus:ring-2 focus:outline-none  rounded-base text-base font-medium px-2 py-1.5 text-center ms-1.5 me-1 cursor-pointer ">All</button>
      <button onClick={()=>setComplete(false)} type="button" className="text-(--secondary-color) shadow hover:border-default bg-neutral-primary focus:ring-2 focus:outline-none  rounded-base text-base font-medium px-2 py-1.5 text-center me-1 cursor-pointer">Bending</button>
      <button onClick={()=>setComplete(true)} type="button" className="text-(--secondary-color) shadow hover:border-default bg-neutral-primary focus:ring-2 focus:outline-none  rounded-base text-base font-medium px-2 py-1.5 text-center me-1.5 cursor-pointer">Completed</button>
     </div>
      </div>

      <div className="flex lg:gap-3 lg:items-center flex-col  lg:flex-row justify-start">
      <div className="flex items-center gap-2 mt-3">
        <label className="text-(--secondary-color) font-medium">Priority</label>
        <div className="flex items-center justify-center py-1.5 gap-0.5 bg-(--secondary-color)/8 flex-wrap  rounded-2xl w-fit">
      <button onClick={()=>setPriority("low")} type="button" className="text-(--secondary-color) shadow bg-neutral-primary focus:ring-2 focus:outline-none  rounded-base text-base font-medium px-2 py-1.5 text-center ms-1.5 me-1 cursor-pointer">Low</button>
      <button onClick={()=>setPriority("medium")} type="button" className="text-(--secondary-color) shadow hover:border-default bg-neutral-primary focus:ring-2 focus:outline-none  rounded-base text-base font-medium px-2 py-1.5 text-center me-1 cursor-pointer">Medium</button>
      <button onClick={()=>setPriority("high")} type="button" className="text-(--secondary-color) shadow hover:border-default bg-neutral-primary focus:ring-2 focus:outline-none  rounded-base text-base font-medium px-2 py-1.5 text-center me-1.5 cursor-pointer">High</button>
     </div>
      </div>
      <p className="text-(--secondary-color)/30 hidden lg:block">|</p>
      <div className="flex items-center gap-2 mt-3 ">
        <label className="text-(--secondary-color) font-medium">Collection</label>
        {collections? 
        <select onChange={(e) => setCategory(e.target.value)} id="priority" className="block lg:w-full  px-3 py-2.5 bg-neutral-secondary-medium border focus:ring-(--primary-color) border-default-medium text-heading text-sm rounded-base px-3 py-2.5 shadow-xs  placeholder:text-body/20 ">
                    {collections.map((collection)=>(  
                      <option key={collection._id} value={collection._id} className="rounded-base cursor-pointer">{collection.title}</option> 
                    ))}
         </select> : null
                    }
      </div>
      </div>

    </div>
    <div>
    </div>
   
    
     
   {!tasks?<p className="text-2xl text-center font-medium mt-50">No Tasks Found</p>:
   <div className="px-8 pb-8">
    {tasks.map((task)=>(
      <TaskItem task={task} tasks={tasks} setTasks={setTasks} toggleTask={toggleTask} deleteTask={deleteTask} getTasks={getTasks} collections={collections}/>
    ))}
   </div>
   }
  </div>}

  
  </>);
}