import React ,{ useState,useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import CommonHeader from "../components/Header/CommonHeader";
import TeamTaskSidebar from "../components/Sidebar/TeamTaskSidebar";
import api from "../config/axios";
import Loading from "../components/Loading/Loading";
import { format } from "date-fns";



function TeamTaskLayout() {
  const { id: projectId } = useParams();
  const [allTask, setAllTask] = useState([]);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [reloadContent, setReloadContent] = useState(false);

  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const getAllTaskByProjectId = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/Task/GetTasksForProjectAsync/${projectId}`);
      if (response.data && response.data.length > 0) {
        const formattedTasks = response.data.map((task) => ({
          ...task,
          deadline: format(new Date(task.deadline), "dd/MM/yyyy"),
        }));
        setAllTask(formattedTasks);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTaskByProjectId();
  }, [projectId, reloadContent]);

  const filteredTasks = statusFilter !== null
    ? allTask.filter((task) => task.status === statusFilter)
    : allTask;
  return (
    <>
    <Loading loading={loading} />
    <div className="h-screen flex">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <TeamTaskSidebar taskId={projectId} onSelectStatus={setStatusFilter} />
      </div>

      <div className="flex-1 overflow-y-auto sticky top-0">
        <CommonHeader />
        <div className="p-4 2xl:px-10">
          <Outlet 
            context={{
              selected,
              setSelected,
              filteredTasks,
              open,
              setOpen,
              projectId,
              handleReloadContent,
            }} 
          />
        </div>
      </div>
    </div>
  </>
  );
}

export default TeamTaskLayout;
