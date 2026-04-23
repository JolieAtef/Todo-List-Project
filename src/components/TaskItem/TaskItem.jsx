import axios from "axios";
import React, { useState } from "react";
import { TaskModal } from "../modals/TaskModal";
import { MoveTaskModal } from "../modals/MoveTaskModal";

export function TaskItem({task, tasks , toggleTask , deleteTask , isOpenAdd , setIsOpenAdd , setTasks , setCategory , category , collections , getCategory}) {
    let [isOpenDelete , setIsOpenDelete]=useState(false)
    let [isOpenUpdate , setIsOpenUpdate]=useState(false)
    let [isOpenMove , setIsOpenMove] = useState(false) 
    let [currentTask , setCurrentTask] = useState("")

    
  return (
  <>
   {!task?<div></div>:
   <div>
   <div className="bg-neutral-primary-soft block w-full p-3 md:w-8/10 mx-auto mt-3 md:p-6 border border-default rounded-base hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 " key={task._id} >
          <div className="flex justify-between items-center">
          <div className="flex items-center mb-2">
           <input id="default-checkbox"  onClick={() => toggleTask(task._id)} checked={task.isCompleted}  type="checkbox" value="" className="w-5 h-5 border text-[var(--primary-color)] focus:ring-0 border-default-medium rounded-xl bg-neutral-secondary-medium  cursor-pointer"/>
           <label htmlFor="default-checkbox" className={`select-none ms-2  text-3xl font-semibold tracking-tight ${task.isCompleted?"line-through text-gray-400" : "text-heading"} leading-8`}>{task.title}</label>
          </div>
          {task.priority=="high"?<span className="bg-danger-soft border border-danger-subtle text-fg-danger-strong text-xs font-medium px-1.5 py-0.5 rounded">High</span>:<>{task.priority=="medium"? <span className="bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/30 text-[var(--primary-color)] text-xs font-medium px-1.5 py-0.5 rounded">medium</span>:<span className="bg-gray-100 border border-gray-subtle text-gray-500 text-xs font-medium px-1.5 py-0.5 rounded">Low</span>}</>}
          </div>
          <p className="text-[var(--secondary-color)] mb-2">{task.description}</p>
          <div className="collection_footer flex justify-between">
           <div className={`date flex items-center gap-1.5 border px-3 rounded-full ${new Date(task.dueDate) > Date.now()?`bg-[var(--low-color)] border-[var(--secondary-color)]`:`border-danger-strong bg-red-100/60`}`}>
           <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0H2.91667V1.16667H7.58333V0H8.75V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667V11.6667M1.16667 10.5H9.33333V10.5V10.5V4.66667H1.16667V10.5V10.5V10.5V10.5M1.16667 3.5H9.33333V2.33333V2.33333V2.33333H1.16667V2.33333V2.33333V3.5V3.5M1.16667 3.5V2.33333V2.33333V2.33333V2.33333V2.33333V2.33333V3.5V3.5V3.5" fill={`${new Date(task.dueDate) > Date.now()?`#564338`:`#9f1239`}`}/>
           </svg>
           <h6 className={`${new Date(task.dueDate) > Date.now()?`text-[var(--secondary-color)]`:`text-danger-strong`}`}>
              {task.dueDate.split("T")[0]}
            </h6>
           </div>
          <div className="btns flex gap-2">
          <button onClick={()=>{setIsOpenMove(true) , setCurrentTask(task)}} type="button" className="inline-flex items-center justify-center  text-[var(--secondary-color)] bg-[var(--low-color)]  hover:-translate-y-1 transition-all duration-150 hover:shadow-amber-900  shadow-xs rounded-full w-9 h-9 focus:outline-none cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 9l-3 3m0 0l3 3m-3-3h16m3-6l-3-3m3 3l-3 3m3-3H5" />
          </svg>
           </button>

          <button onClick={()=>setIsOpenUpdate(true)} type="button" className="inline-flex items-center justify-center  text-[var(--secondary-color)] bg-[var(--low-color)]  hover:-translate-y-1 transition-all duration-150 hover:shadow-amber-900 shadow-xs rounded-full w-9 h-9 focus:outline-none  cursor-pointer">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M1.66667 13.3333H2.85417L11 5.1875L9.8125 4L1.66667 12.1458V13.3333ZM0 15V11.4583L11 0.479167C11.1667 0.326389 11.3507 0.208333 11.5521 0.125C11.7535 0.0416667 11.9653 0 12.1875 0C12.4097 0 12.625 0.0416667 12.8333 0.125C13.0417 0.208333 13.2222 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.809 2 14.8854 2.20833C14.9618 2.41667 15 2.625 15 2.83333C15 3.05556 14.9618 3.26736 14.8854 3.46875C14.809 3.67014 14.6875 3.85417 14.5208 4.02083L9.03125 9.51042L3.54167 15H0ZM10.3958 4.60417L9.8125 4L11 5.1875L10.3958 4.60417Z" fill="#564338"/>
          </svg>
           </button>
      
          <button onClick={()=>setIsOpenDelete(true)} type="button" className="inline-flex items-center justify-center  text-[var(--secondary-color)] bg-[var(--low-color)]  hover:-translate-y-1 transition-all duration-150 hover:shadow-amber-900  shadow-xs rounded-full w-9 h-9 focus:outline-none cursor-pointer">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 15C2.04167 15 1.64931 14.8368 1.32292 14.5104C0.996528 14.184 0.833333 13.7917 0.833333 13.3333V2.5H0V0.833333H4.16667V0H9.16667V0.833333H13.3333V2.5H12.5V13.3333C12.5 13.7917 12.3368 14.184 12.0104 14.5104C11.684 14.8368 11.2917 15 10.8333 15H2.5ZM10.8333 2.5H2.5V13.3333H10.8333V2.5ZM4.16667 11.6667H5.83333V4.16667H4.16667V11.6667ZM7.5 11.6667H9.16667V4.16667H7.5V11.6667ZM2.5 2.5V13.3333V2.5Z" fill="#564338"/>
          </svg>
           </button>
           </div>
          </div>
       </div>
  
          

         <div id="popup-modal" tabIndex="-1" className={`${isOpenDelete?"flex":"hidden"} overflow-y-auto overflow-x-hidden bg-gray-400/45 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`} >
         <div className="relative p-4 w-full max-w-md max-h-full">
         <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                <button onClick={()=>setIsOpenDelete(false)} type="button" className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <h3 className="mb-6 text-body">Are you sure you want to delete this task from your list?</h3>
                <div className="flex items-center space-x-4 justify-center">
                    <button onClick={()=>{deleteTask(task._id), setIsOpenDelete(false)}} data-modal-hide="popup-modal" type="button" className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                    Yes, I'm sure
                    </button>
                    <button onClick={()=>setIsOpenDelete(false)} data-modal-hide="popup-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">No, cancel</button>
                </div>
            </div>
        </div>
    </div>
    </div>
   </div>
   }
   
   <TaskModal isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate}  currentTask={task} setCategory={setCategory} category={category} setTasks={setTasks} tasks={tasks}/>
   <MoveTaskModal isOpenMove={isOpenMove} setIsOpenMove={setIsOpenMove} collections={collections} currentTask={currentTask} category={category} getCategory={getCategory} />
  </>
  );
}