import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Inject,
  Day,
  Week,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base"
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import AddSchedule from "../../components/ManageSchedule/Teacher/AddSchedule";

registerLicense("GTIlMmhhZX1ifWBmaGJgfGNrfGFjYWdzYmNpYWtpYGZoJyEyPjAnPSA2YmRiYmRnEzUjJ302NyZ9JT0=")

const data = [
  {
    Id: 1,
    Subject: "Kinh tế chính trị",
    StartTime: new Date(2024, 5, 15, 14, 30),
    EndTime: new Date(2024, 5, 15, 17, 0),
    IsAllDay: false,
    Location:"P.410 - Nhà văn hoá sinh viên",
  },
  {
    Id: 2,
    Subject: "Xác suất thống kê",
    StartTime: new Date(2024, 5, 13, 12, 30),
    EndTime: new Date(2024, 5, 13, 14, 15),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
    Location:"P.614 - Nhà văn hoá sinh viên",
  },
];



function TeacherSchedule() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/getAllSchedule");
  //       const formattedData = response.data.map(item => ({
  //         Id: item.id,
  //         Subject: item.subject,
  //         StartTime: new Date(item.startTime),
  //         EndTime: new Date(item.endTime),
  //         IsAllDay: item.isAllDay,
  //         Status: item.status,
  //         Priority: item.priority,
  //       }));
  //       setData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [open, setOpen] = useState(false);
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
    <div className="text-center text-lg font-semibold text-blueLevel5 uppercase">Quản lý thời khoá biểu của tôi</div>
      <div className="flex justify-center items-center min-h-screen -mt-24">
        <ScheduleComponent
        width={1200}
        height={500}
          eventSettings={{
            dataSource: data,
          }}
         // selectedDate={new Date(2024,1,11)}
          currentView="Month"
         // readonly={true} 
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="Month" />
            <ViewDirective option="Agenda" />
          </ViewsDirective>

          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      </div>

      <AddSchedule open={open} setOpen={setOpen}/>
    </>
  );
}

export default TeacherSchedule;
