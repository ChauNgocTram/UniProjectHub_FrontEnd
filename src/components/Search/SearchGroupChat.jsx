import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchGroupChat() {
  return (
    <form className=" relative mx-auto">
      <div className="relative">
        <button className="absolute left-1 top-1/2 -translate-y-1/2 p-3  rounded-full">
          <AiOutlineSearch />
        </button>
        <input
          type="search"
          placeholder="Tìm kiếm..."
          className="w-full p-3 pl-12 rounded-2xl bg-neutral-100 focus:outline-none focus:shadow-outline"
        />
      </div>
    </form>
  );
}

export default SearchGroupChat;
