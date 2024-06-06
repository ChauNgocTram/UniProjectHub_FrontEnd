import React, { useState } from "react";
import { BsGrid, BsListUl } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

import Title from "../../../../components/Title";
import Tabs from "../../../../components/Tabs/Tabs";
import Button from "../../../../components/Button";
import PersonalListView from "../../../../components/Tasks/ViewTask/Personal/PersonalListView";
import PersonalBoardView from "../../../../components/Tasks/ViewTask/Personal/PersonalBoardView"
import AddPersonalTask from "../../../../components/Tasks/ManageTask/AddPersonalTask";

const TABS = [
  { title: "Bảng", icon: <BsGrid /> },
  { title: "Danh Sách", icon: <BsListUl /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};
function AllPersonalTask() {
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
          <PersonalBoardView />
        ) : (
          <div className="w-full">
            {/* <ListView tasks={tasks} /> */}
            <PersonalListView />
          </div>
        )}
      </Tabs>

      <AddPersonalTask open={open} setOpen={setOpen} />
    </div>
  </>
  )
}

export default AllPersonalTask