import React from 'react'
import PersonalTaskCard from './PersonalTaskCard'

function PersonalBoardView({ tasks }) {
  return (
    <div
    
     className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10 '>
      {/* {tasks.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))} */}
      <div 
      // className={clsx(
            //   "rounded-lg h-fit p-4",
            //   BG_TASK_CARD[task?.status]
            // )}
      className='bg-toDo rounded-lg h-fit p-4'>
      <PersonalTaskCard/>
      </div>
      
      
    </div>
  )
}

export default PersonalBoardView