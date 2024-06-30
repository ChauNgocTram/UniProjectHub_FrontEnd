import React from 'react'
import Lottie from "lottie-react"
import Plane from "../../assets/Plane.json"

function Loading({ loading }) {
    if (!loading) return null;
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
       <div className="flex flex-col items-center w-60 h-60">
       <Lottie animationData={Plane}/>
       <span className='text-white'>Vui lòng đợi APN xíu nhé...</span>
       </div>
       
    </div>
  )
}

export default Loading   