import React , { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  return (
    <form className='w-[500px] relative mx-auto'>
        <div className='relative'>
            <input type="search" placeholder='Tìm kiếm nội dung...' className='w-full p-3 rounded-full bg-neutral-100 focus:outline-none focus:shadow-outline' />
            <button className='absolute right-1 top-1/2 -translate-y-1/2 p-3 bg-mainBg rounded-full'><AiOutlineSearch /></button>
        </div>

        {/* <div className='absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2'>
           
        </div> */}
    </form>
  )
}

export default SearchBar