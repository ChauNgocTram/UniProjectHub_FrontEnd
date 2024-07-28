import React, { useState } from "react";
import { format, startOfWeek, addDays, subDays, eachDayOfInterval, isToday, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useGetScheduleByUserId } from "../../api/scheduleApi";
import { useParams } from "react-router-dom";

const TeacherSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userId } = useParams();

  const { data: scheduleData = [], isLoading, isError } = useGetScheduleByUserId(userId);

  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfWeekDate = addDays(startOfWeekDate, 6);
  const weekDays = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfWeekDate,
  });

  const formatDate = (date) => format(date, "EEEE", { locale: vi });
  const formatDay = (date) => format(date, "dd/MM", { locale: vi });
  const formatMonthYear = (date) => format(date, "MMMM yyyy", { locale: vi });
  const formatWeekRange = (start, end) =>
    `${format(start, "dd/MM")} -> ${format(end, "dd/MM")}`;

  const timeSlots = [];
  for (let hour = 7; hour <= 22; hour++) {
    timeSlots.push(`${hour < 10 ? '0' : ''}${hour}:00`);
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching schedule data.</p>;

  const getSpan = (startTime, endTime) => {
    const startMinutes = new Date(startTime).getHours() * 60 + new Date(startTime).getMinutes();
    const endMinutes = new Date(endTime).getHours() * 60 + new Date(endTime).getMinutes();
    return (endMinutes - startMinutes) / 60;
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-6 mt-24">
        <div className="px-12 uppercase font-semibold mb-2">
          <h1>{formatMonthYear(currentDate)}</h1>
        </div>

        <div className="flex items-center gap-5 justify-center">
          <IoIosArrowDropleft
            size={25}
            color="#4E93B2"
            onClick={() => setCurrentDate(subDays(currentDate, 7))}
            className="cursor-pointer"
          />
          <span>{formatWeekRange(startOfWeekDate, endOfWeekDate)}</span>
          <IoIosArrowDropright
            size={25}
            color="#4E93B2"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="overflow-x-auto px-8 pb-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4 text-left text-sm bg-slate-200">Thời gian</th>
              {weekDays.map(day => (
                <th
                  key={day.toString()}
                  className={`py-2 px-4 text-sm text-center border-l border-gray-300 bg-blueLevel5 text-white ${
                    isSameDay(day, new Date()) ? 'bg-blueLevel4' : ''
                  }`}
                >
                  {formatDate(day)}<br/>
                  {formatDay(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4 text-sm">{time}</td>
                {weekDays.map(day => {
                  const dayString = format(day, 'yyyy-MM-dd');
                  const events = scheduleData.filter(row => {
                    const eventDay = format(new Date(row.startTime), 'yyyy-MM-dd');
                    return eventDay === dayString && format(new Date(row.startTime), 'HH:mm') <= time && format(new Date(row.endTime), 'HH:mm') > time;
                  });

                  const hasTodayEvents = dayString === today && events.length > 0;

                  return (
                    <td
                      key={day.toString()}
                      className={`text-sm py-2 border-l border-gray-300 relative w-[200px] ${
                        hasTodayEvents ? 'bg-green-100' : ''
                      }`}
                    >
                      {events.map((event, i) => {
                        const span = getSpan(event.startTime, event.endTime);
                        const topOffset = i * 20; 
                        return (
                          <div
                            key={event.id}
                            className="absolute bg-blueLevel1 font-medium p-1 rounded border border-blue-300"
                            style={{
                              top: `${topOffset}px`,
                              height: `${span * 20}px`,
                              width: '100%',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {event.courseName}
                          </div>
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherSchedule;
