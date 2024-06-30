import React from 'react'
import { NavLink } from 'react-router-dom'
import {ALL_TEAM_PROJECTS} from "../../../../../../routes/constant"
import Lottie from "lottie-react"
import Completed from "../../../../../../assets/Completed.json"

function ThirdStep() {
  return (
    <div className="container md:mt-2">
    <div className="flex flex-col items-center">     
      <div className="w-[180px] h-[100px] my-4 pb-8">
      <Lottie animationData={Completed}/>
      </div>

      <div className="mt-6 text-xl font-semibold uppercase text-blueLevel5">
        Hoàn tất!
      </div>

      <div className="text-lg font-semibold text-gray-500">
        Dự án nhóm của bạn đã được tạo.
      </div>

      <NavLink to={`/${ALL_TEAM_PROJECTS}`} className="mt-10">
        <button className="h-10 px-5 text-blueLevel5 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-blueLevel3">
          Đến dự án
        </button>
      </NavLink>
    </div>
  </div>
  )
}

export default ThirdStep