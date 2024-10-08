import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { getInitials } from "../utils";

function ProjectAvatar({ cardName }) {
  return (
    <div className="px-3">
      <Popover className="relative">
        <>
          <PopoverButton className="group flex items-center justify-center outline-none w-12 h-12 rounded-xl text-white bg-mainColor font-medium">
            {cardName.img && cardName.img !== "null" ? (
              <img
                src={cardName.img}
                alt=""
                className="relative inline-block w-12 h-12 object-cover object-center"
              />
            ) : (
              
              <span className="text-xl font-semibold">
                {getInitials(cardName.name)}
              </span>
         )} 
          </PopoverButton>
        </>
      </Popover>
    </div>
  );
}

export default ProjectAvatar;
