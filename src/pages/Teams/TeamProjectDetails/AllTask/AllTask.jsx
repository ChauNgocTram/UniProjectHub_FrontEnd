import React, { useState }  from "react";
import { BsGrid, BsListUl } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Title from "../../../../components/Title";
import Tabs from "../../../../components/Tabs/Tabs";
import Button from "../../../../components/Button";
import BoardViewAll from "../../../../components/Tasks/ViewTask/Team/BoardViewAll";
import ListView from "../../../../components/Tasks/ViewTask/Team/ListView";
import AddTask from "../../../../components/Tasks/ManageTask/AddTask";
import { useOutletContext } from "react-router-dom";
import Empty from "../../../../assets/Empty.json";
import NoDataPlaceholder from "../../../../components/NoDataPlaceholder";
import { useGetProjectById } from "../../../../api/projectApi";
import Loading from "../../../../components/Loading/Loading";

const TABS = [
  { title: "Bảng", icon: <BsGrid /> },
  { title: "Danh Sách", icon: <BsListUl /> },
];

function AllTask() {
  const {
    selected,
    setSelected,
    filteredTasks,
    open,
    setOpen,
    projectId,
  } = useOutletContext();

  const { data: project, isLoading, isError } = useGetProjectById(projectId);

  if (isLoading ) {
    return <Loading loading={isLoading} />;
  }
  if (isError) return <div>Error loading project details</div>;

  const messageLines = [
    "Chiếc hộp này đang chờ đợi nội dung từ bạn.",
    "Hãy tạo dữ liệu mới ngay thôi!",
  ];

  const sortedTasks = filteredTasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 mx-4">
        <Title title={project.name} />
        <Button
          onClick={() => setOpen(true)}
          label="Tạo Task"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-mainColor font-semibold text-white rounded-md py-2 2xl:py-2.5"
        />
      </div>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {
          sortedTasks.length > 0 ? (
            selected !== 1 ? (
              <BoardViewAll tasks={sortedTasks} />
            ) : (
              <div className="w-full">
                <ListView tasks={sortedTasks} />
              </div>
            )
          ) : (
            <NoDataPlaceholder
              animationData={Empty}
              messageLines={messageLines}
            />
          )
        }
      </Tabs>
      <AddTask
        open={open}
        setOpen={setOpen}
        projectId={projectId}
      />
    </div>
  );
}

export default AllTask;
