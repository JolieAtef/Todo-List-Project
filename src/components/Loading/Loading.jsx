import React from "react";


export function Loading() {
  return (
  <>
  <div className="isLoading">
<div role="status" className="max-w-sm p-4 animate-pulse md:p-6">
    <div className="h-2.5 bg-neutral-quaternary rounded-full w-48 mb-2.5"></div>
    <div className="w-80 h-2 mb-10 bg-neutral-quaternary rounded-full"></div>
</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-3">
{  
   Array.from({ length: 9 }).map((i)=>(
    <div role="status" className="max-w-[340px] p-4 border border-default rounded-base shadow-xs animate-pulse md:p-6">
    <div className="h-2.5 bg-neutral-quaternary rounded-full w-30 mb-4"></div>
    <div className="h-2 bg-neutral-quaternary rounded-full mb-2.5"></div>
    <div className="h-2 bg-neutral-quaternary rounded-full mb-2.5"></div>
    <div className="h-2 bg-neutral-quaternary rounded-full"></div>
    <span className="sr-only">Loading...</span>
     </div>
   ))
}
</div>
</div>
  </>
  );
}