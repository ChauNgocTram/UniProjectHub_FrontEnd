import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import CommonHeader from '../components/Header/CommonHeader';
import PersonalTaskSidebar from '../components/Sidebar/PersonalTaskSidebar';
import Loading from '../components/Loading/Loading';
import { useTasksByProjectId } from '../api/taskApi';

function PersonalTaskLayout() {
  const { id: projectId } = useParams();
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState(null);
    
    const { data: allTask = [], isLoading, error } = useTasksByProjectId(projectId);

    if (isLoading) {
        return <Loading loading={isLoading} />;
    }

    if (error) {
        return <div>Error fetching tasks: {error.message}</div>;
    }

    const isArray = Array.isArray(allTask);

    const filteredTasks = (isArray ? allTask : []).filter((task) => 
        statusFilter !== null ? task.status === statusFilter : true
    );

    return (
        <>
            <Loading loading={loading} />
            <div className="h-screen flex">
                <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
                    <PersonalTaskSidebar taskId={projectId} onSelectStatus={setStatusFilter} />
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
                            }} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalTaskLayout;
