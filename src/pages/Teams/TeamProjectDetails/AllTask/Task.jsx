import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";


import Title from "../../../../components/Title";
import Button from "../../../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../../../../components/Tabs/Tabs";

import BoardViewByStatus from '../../../../components/Tasks/ViewTask/BoardViewByStatus';
import ListView from '../../../../components/Tasks/ViewTask/ListView';
import AddTask from '../../../../components/Tasks/ManageTask/AddTask';

const TABS = [
  { title: "Bảng", icon: <MdGridView /> },
  { title: "Danh sách", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

function Task() {
  const { id } = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  //const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");

  //const status = params?.status || "";

  // useEffect(() => {
  //   const fetchStatus = async () => {
  //     try {
  //       const response = await axios.get(`/api/tasks/${id}`);
  //       const task = response.data;
  //       setStatus(task.status);
  //     } catch (error) {
  //       console.error("Error fetching task status:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStatus();
  // }, [id]);


  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {/* {status === "toDo" && ( */}
          <Button
            onClick={() => setOpen(true)}
            label='Tạo Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-mainColor text-white rounded-md py-2 2xl:py-2.5'
          />
        {/* )} */}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        

        {selected !== 1 ? (
          // <BoardViewByStatus tasks={tasks} />
          <BoardViewByStatus />
        ) : (
          <div className='w-full'>
            {/* <ListView tasks={tasks} /> */}
            <ListView  />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  )
}

export default Task