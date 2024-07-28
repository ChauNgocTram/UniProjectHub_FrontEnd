import { Badge, Calendar } from "antd"; // Import Calendar and Badge from antd
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { fetchSchedules } from "../../api/scheduleApi"; // Adjust the import path as needed
import Button from "../../components/Button";
import AddSchedule from "../../components/ManageSchedule/Teacher/AddSchedule";

const TeacherSchedule = () => {
  const [open, setOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSchedules();
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchData();
  }, []);

  // Updated to use cellRender
  const cellRender = (value) => {
    const events = scheduleData.filter((event) =>
      value.isSame(new Date(event.StartTime), "day")
    );

    return (
      <ul className="events">
        {events.map((event) => (
          <li key={event.Id}>
            <Badge color="blue" text={event.Subject} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="flex justify-end mt-24 mb-1 mr-36 pr-4">
        <Button
          onClick={() => setOpen(true)}
          label="Tạo Lịch"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-mainColor font-semibold text-white rounded-md py-2 2xl:py-2.5"
        />
      </div>
      <div className="text-center text-lg font-semibold text-blueLevel5 uppercase">
        Quản lý thời khoá biểu của tôi
      </div>
      <div className="flex justify-center items-center min-h-screen -mt-24">
        <Calendar
          cellRender={cellRender} // Updated prop
          fullscreen={false}
        />
      </div>

      <AddSchedule open={open} setOpen={setOpen} />
    </>
  );
};

export default TeacherSchedule;
