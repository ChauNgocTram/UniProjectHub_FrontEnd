import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
  } from "@headlessui/react";
  import React, { Fragment } from "react";
  import { getInitials } from "../../utils";


function GroupChatAvatar() {
    return (
        <div className="pr-4">
         <Popover className="relative">
           {/* {({ open }) => ( */}
           <>
             <PopoverButton className="group flex items-center justify-center outline-none w-12 h-12 rounded-full text-white bg-mainColor font-medium">
               <span>
                   {/* {getInitials(user?.name)} */}
                   {getInitials("Mi")}
                   </span>
               <span>Mi</span>
             </PopoverButton>
   
             
           </>
           {/* )} */}
         </Popover>
       </div>
     )
}

export default GroupChatAvatar