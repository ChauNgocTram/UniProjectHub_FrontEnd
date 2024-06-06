import React, { useState } from "react";
import { BsGrid, BsListUl } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

import Title from "../../../../components/Title";
import Tabs from "../../../../components/Tabs/Tabs";
import Button from "../../../../components/Button";
import BoardViewAll from "../../../../components/Tasks/ViewTask/Team/BoardViewAll";
import ListView from "../../../../components/Tasks/ViewTask/Team/ListView";
import AddTask from "../../../../components/Tasks/ManageTask/AddTask";

const TABS = [
  { title: "Bảng", icon: <BsGrid /> },
  { title: "Danh Sách", icon: <BsListUl /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

function AllTask() {
  //const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(0);
  return (
    <>
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
            // <BoardView tasks={tasks} />
            <BoardViewAll />
          ) : (
            <div className="w-full">
              {/* <ListView tasks={tasks} /> */}
              <ListView />
            </div>
          )}
        </Tabs>

        <AddTask open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default AllTask;
