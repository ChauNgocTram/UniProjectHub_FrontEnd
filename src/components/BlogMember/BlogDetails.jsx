import React from "react";
import { BiRepost } from "react-icons/bi";
import { MdBookmarkBorder } from "react-icons/md";

function BlogDetails() {
  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-textSecondary">15/07/2024 20:35</span>
        <div className="flex items-center justify-end gap-3 px-3">
          <BiRepost
            size={30}
            className="text-textSecondary hover:text-blueLevel4 cursor-pointer"
          />
          <MdBookmarkBorder
            size={25}
            className="text-textSecondary hover:text-blueLevel4 cursor-pointer"
          />
        </div>
      </div>

      <div className="border-2 border-neutral-300 py-5 px-6 text-justify rounded-xl">
        <p className="font-semibold text-lg text-blueLevel4 mb-2">Tiêu đề</p>
        <p className="text-sm" style={{ lineHeight: '1.6' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, vero
          facilis. Quaerat sint cumque soluta deleniti eos iure, velit expedita.
          Consequatur cumque modi obcaecati tempore tenetur excepturi, officia
          provident nisi qui incidunt facere, placeat ratione! Reiciendis
          distinctio quasi nulla molestiae tempore saepe, iure soluta libero
          sequi nobis quod. Eum, cupiditate!
        </p>
      </div>
    </div>
  );
}

export default BlogDetails;
