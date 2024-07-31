import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri";
import AddSchedule from "../../components/ManageSchedule/Teacher/AddSchedule";
import EventCard from "../../components/Schedule/EventCard";
import { useGetAllSchedule } from "../../api/scheduleApi";
import { useGetAllUser } from "../../api/userApi";
import Footer from "../../components/Footer/Footer";

function Schedule() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: scheduleData, isLoading, isError } = useGetAllSchedule();
  const { data: users = [] } = useGetAllUser();
  const navigate = useNavigate();

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return users.filter(
      (user) =>
        user.userName &&
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    navigate(`/thoi-khoa-bieu-giang-vien/${user.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const user = filteredUsers.find(
      (user) =>
        user.userName &&
        user.userName.toLowerCase() === searchQuery.toLowerCase()
    );
    if (user) {
      navigate(`/thoi-khoa-bieu-giang-vien/${user.id}`);
    } else {
      alert("User not found");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <>
      <div className="flex justify-between mt-28 mb-1 mr-36 pr-4">
        <div className="flex items-center gap-3 ml-28 text-lg font-semibold text-blueLevel5 uppercase">
          <RiCalendarScheduleLine size={30} />
          Schedule
        </div>
        <Button
          onClick={() => setOpen(true)}
          label="Tạo Lịch"
          icon={<IoMdAdd className="text-md" />}
          className="flex flex-row-reverse gap-1 items-center bg-mainColor font-semibold text-white rounded-md py-1 2xl:py-1 text-md"
        />
      </div>

      <div className="ml-28 mb-6 leading-loose pr-8 text-sm italic">
        <p>
          Cung cấp thông tin về lịch dự thính lớp học, các buổi workshop,
          seminar và các sự kiện khác.
        </p>
      </div>
      <div className="mb-6 relative">
        <form onSubmit={handleSearchSubmit} className="flex ml-28 gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm lớp học theo tên giảng viên"
            className="border border-gray-300 p-2 rounded-md w-2/6 focus:outline-none"
          />
          <Button
            type="submit"
            label="Tìm kiếm"
            className="bg-blueLevel5 text-white rounded-md px-4 py-2"
          />
        </form>

        {searchQuery && filteredUsers.length > 0 && (
          <ul className="border border-gray-300 rounded-md mt-2 ml-28 absolute z-50 bg-white w-2/6">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleUserSelect(user)}
              >
                {user.userName}
              </li>
            ))}
          </ul>
        )}

        <EventCard events={scheduleData} />
      </div>
      <Footer />

      <AddSchedule open={open} setOpen={setOpen} />
    </>
  );
}

export default Schedule;
