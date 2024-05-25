import React from "react";
import TaskCard from "../TaskCard";

const BoardViewAll = ({ tasks }) => {
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 2xl:gap-10'>
      {/* {tasks.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))} */}
      <div className="flex flex-col bg-toDo rounded-lg h-fit p-4">
        <p className="font-semibold border-b-2 border-neutral-400 mb-4 pb-2">TO DO</p>
        
        <div className="mb-4">
        <TaskCard/>
        </div>
        <TaskCard/>
      </div>

      <div className="flex flex-col bg-inProgress rounded-lg h-fit p-4">
        <p className="font-semibold border-b-2 border-neutral-400 mb-4 pb-2">IN PROGRESS</p>
        <TaskCard/>
      </div>

      <div className="flex flex-col bg-completed rounded-lg h-fit p-4">
        <p className="font-semibold border-b-2 border-neutral-400 mb-4 pb-2">COMPLETED</p>
        <TaskCard/>
      </div>

      <div className="flex flex-col bg-pending rounded-lg h-fit p-4">
        <p className="font-semibold border-b-2 border-neutral-400 mb-4 pb-2">PENDING</p>
        <TaskCard/>
      </div>
    </div>
  );
};

export default BoardViewAll;
