import React from "react";
import avtDefault from "../../assets/images/avtDefault.png";

function Comment() {
  return (
    <>
      <div className="px-5 pt-2 pb-7">
        <p className="mb-3 font-semibold text-lg">Bình luận (1)</p>
        <div className="flex gap-3 items-start px-5">
          <img
            src={avtDefault}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-base">User123</p>
            <p className="text-sm text-textSecondary">15-07-2024 22:22</p>
            <p className="mt-1 text-justify text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod,
              mollitia nam! Quidem officia magnam asperiores fugiat repellat
              eaque illo natus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
