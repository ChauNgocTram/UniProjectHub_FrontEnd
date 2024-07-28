import React, { useState } from "react";
import Button from "../../../../components/Button";
import Title from "../../../../components/Title";
import { IoMdAdd } from "react-icons/io";
import AddMember from "../../../../components/TeamMember/AddMember";
import ConfirmatioDialog, { UserAction } from "../../../../components/Dialog/Dialogs";
import { useOutletContext } from "react-router-dom";
import { useMemberByProjectId } from "../../../../api/memberOfProjectApi";
import { useUserById } from "../../../../api/userApi";
import { getInitials } from "../../../../utils";

const colors = ["bg-blue-700", "bg-red-700", "bg-green-700", "bg-yellow-700"];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

function Members() {
  const { projectId } = useOutletContext();
  const { data: members, isLoading: membersLoading, isError: membersError } = useMemberByProjectId(projectId);

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [userColors, setUserColors] = useState({}); 

  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-left">
        <th className="p-2">Username</th>
        <th className="p-2">Họ và tên</th>
        <th className="p-2">Vai trò</th>
        <th className="p-2">Email</th>
      </tr>
    </thead>
  );

  const TableRow = ({ userId, role }) => {
    const { data: userDetail, isLoading: userLoading, isError: userError } = useUserById(userId);


    const userColor = userColors[userId] || getRandomColor();
    if (!userColors[userId]) {
      setUserColors((prevColors) => ({ ...prevColors, [userId]: userColor }));
    }

    if (userLoading) return <tr><td colSpan="3">Loading...</td></tr>;
    if (userError) return <tr><td colSpan="3">Error loading user details</td></tr>;
    if (!userDetail) return null;

    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
        <td className="p-2">
          <div className="flex items-center gap-3">
            {/* {userDetail.avatarURL ? (
              <img src={userDetail.avatarURL} alt="" className="w-10 h-10 rounded-full"/>
            ) : ( */}
              <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center text-sm ${userColor}`}>
                <span className="text-xs md:text-sm text-center">
                  {getInitials(userDetail.userName)}
                </span>
              </div>
            {/* )} */}
            {userDetail.userName}
          </div>
        </td>
        <td className="p-2">
          {userDetail.lastName} {userDetail.firstName}
        </td>
        <td className="p-2">{role}</td>
        <td className="p-2">{userDetail.email}</td>
        <td className="p-2 flex gap-4 justify-end">
          <Button
            className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
            label="Edit"
            type="button"
            onClick={() => editClick({ ...userDetail, role })}
          />
          <Button
            className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
            label="Delete"
            type="button"
            onClick={() => deleteClick(userId)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Thành viên nhóm dự án" />
          <Button
            label="Thêm thành viên"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-mainColor hover:bg-mainBg font-bold text-white rounded-md 2xl:py-2"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {membersLoading && (
                  <tr>
                    <td colSpan="3">Loading members...</td>
                  </tr>
                )}
                {membersError && (
                  <tr>
                    <td colSpan="3">Error loading members</td>
                  </tr>
                )}
                {members?.map((member) => (
                  <TableRow
                    key={member.id}
                    userId={member.userId}
                    role={member.role}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddMember
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
}

export default Members;
