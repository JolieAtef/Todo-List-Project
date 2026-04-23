import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function MoveTaskModal({isOpenMove , setIsOpenMove , collections , currentTask , category , getCategory}) {
  
  let [selectedCollection, setSelectedCollection]= useState("")

  
    function submit(e){
    e.preventDefault()
    axios.put(`https://todo-app-backend-wine.vercel.app/tasks/move/${currentTask._id}`,{category:selectedCollection},{
        headers:{
            authorization:localStorage.getItem("Token")
        }
    }).then((res)=>{
        toast.success(res.data.message)
        getCategory()
    }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.message) 
    })
  }

  return (
  <>
  <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isOpenMove ? 'flex' :'hidden'}  bg-gray-400/45 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  min-h-screen  `}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                   Task Move To ...
                </h3>
                <button onClick={()=>{setIsOpenMove(false)}}  type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={(e)=>submit(e)}>
             <h3 className="text-2xl text-(--medium-color) my-3">Choose Collection</h3>
             <div className="grid gap-4  py-4 md:py-3">
             <div className="z-10 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-full" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
            {collections?
             <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownHelperRadioButton">
             {collections.map((collection)=>(<div>
              {collection._id != category ? 
               <li>
               <div className="flex p-2 w-full hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                <div className="flex items-center h-5">
                 <input onClick={()=>setSelectedCollection(collection._id)} id="helper-radio-1" name="helper-radio" style={{ accentColor: "red" }} type="radio" value={collection._id} className="w-4 h-4 "/>
               </div>
              <div className="ms-2 text-sm">
               <label for="helper-radio-1" className="select-none font-medium text-heading">
                  <div className="mb-1">{collection.title}</div>
               </label>
              </div>
              </div>
               </li> : null
                    }
                </div>
                ))}
            </ul>: null
            }
           </div>              
           </div>
          
           <div className="flex justify-center border-t border-default pt-4 md:pt-6">
             <button onClick={()=>setIsOpenMove(false)} type="submit" className="flex justify-center items-center text-(--low-color) bg-[linear-gradient(135deg,var(--primary-color),var(--medium-color))] box-border border border-transparent focus:ring-4 focus:ring-(--medium-color)/20 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
               Done
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
  
  </>
  );
}



