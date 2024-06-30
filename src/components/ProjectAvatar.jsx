import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils";

function ProjectAvatar({ cardName }) {
  return (
    <div className="px-3">
      <Popover className="relative">
        <>
          <PopoverButton className="group flex items-center justify-center outline-none w-16 h-16 rounded-xl text-white bg-mainColor font-medium">
            {/* {cardName.img && cardName.img !== "" ? (
              <img
                src={cardName.img}
                alt=""
                className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
              />
            ) : ( */}
              <span className="text-2xl font-semibold">
                {getInitials(cardName.name)}
              </span>
            {/* )} */}
          </PopoverButton>
        </>
      </Popover>
    </div>
  );
}

export default ProjectAvatar;
