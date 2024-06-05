import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
  } from "@headlessui/react";
  import React, { Fragment } from "react";
  import { getInitials } from "../utils";

function ProjectAvatar() {
  return (
     <div className="px-3">
      <Popover className="relative">
        {/* {({ open }) => ( */}
        <>
          <PopoverButton className="group flex items-center justify-center outline-none w-16 h-16 rounded-xl text-white bg-mainColor font-medium">
            <span>
                {/* {getInitials(user?.name)} */}
                {getInitials("M")}
                </span>
            
          </PopoverButton>

          
        </>
        {/* )} */}
      </Popover>
    </div>
  )
}

export default ProjectAvatar