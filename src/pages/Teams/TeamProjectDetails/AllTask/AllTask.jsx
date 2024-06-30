import React, { useEffect, useState } from "react";
import { BsGrid, BsListUl } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

import Title from "../../../../components/Title";
import Tabs from "../../../../components/Tabs/Tabs";
import Button from "../../../../components/Button";
import BoardViewAll from "../../../../components/Tasks/ViewTask/Team/BoardViewAll";
import ListView from "../../../../components/Tasks/ViewTask/Team/ListView";
import AddTask from "../../../../components/Tasks/ManageTask/AddTask";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import api from "../../../../config/axios";
import Loading from "../../../../components/Loading/Loading";
const TABS = [
  { title: "Bảng", icon: <BsGrid /> },
  { title: "Danh Sách", icon: <BsListUl /> },
];



function AllTask() {
  const { id: projectId } = useParams();

  const [allTask, setAllTask] =useState([])
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
   
  const [reloadContent, setReloadContent] = useState(false);
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };


  //const [selectedStatus, setSelectedStatus] = useState(0);

  const getAllTaskByProjectId = async () => {
    try {
      const response = await api.get(`/api/Task/GetTasksForProjectAsync/${projectId}`);
      if (response.data && response.data.length > 0) {
        const formattedTasks = response.data.map((task) => ({
          ...task,
          deadline: format(new Date(task.deadline), "dd/MM/yyyy"),
        }));
        setAllTask(formattedTasks); 
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTaskByProjectId();
  }, [projectId, reloadContent]);

  return (
    <>
    <Loading loading={loading} />
      <div className="w-full">
        <div className="flex items-center justify-between mb-4 mx-4">
          <Title title={"Tasks"} />

          <Button
            onClick={() => setOpen(true)}
            label="Tạo Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-mainColor font-semibold text-white rounded-md py-2 2xl:py-2.5"
          />
        </div>

        <Tabs tabs={TABS} setSelected={setSelected}>
          {selected !== 1 ? (
            <BoardViewAll tasks={allTask}/>
          ) : (
            <div className="w-full">
              <ListView tasks={allTask}/>
            </div>
          )}
        </Tabs>

        <AddTask open={open} setOpen={setOpen} projectId={projectId} onTaskAdded={handleReloadContent}/>
      </div>
    </>
  );
}

export default AllTask;
