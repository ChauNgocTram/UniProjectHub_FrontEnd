import React, { useState } from "react";
import { format, isToday, isAfter, startOfDay } from "date-fns";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Pagination } from 'antd';

function EventCard({ events = [] }) {
  if (!Array.isArray(events)) {
    console.error("Invalid data: events is not an array");
    return <p>Error: Invalid data</p>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const currentDate = startOfDay(new Date());

  const filteredEvents = events.filter(event => isAfter(new Date(event.startTime), currentDate) || isToday(new Date(event.startTime)));

  const totalItems = filteredEvents.length;

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 my-6">
        {paginatedEvents.map((event) => {
          const eventDate = new Date(event.startTime);
          let bgColor = "";

         if (isToday(eventDate)) {
            bgColor = "bg-blueLevel2";
          } else {
            bgColor = "bg-white";
          }

          return (
            <div
              key={event.id}
              className={`w-[300px] ${bgColor} border-neutral-300 border-2 px-5 py-6 m-2 rounded-xl shadow-md`}
            >
              <div className="flex justify-between">
                <div className="flex items-center bg-blueLevel3 w-fit text-neutral-900 font-semibold px-2 py-1 rounded-lg space-x-1.5">
                  <FaRegCalendarAlt size={12} />
                  <span className="text-xs">
                    {format(eventDate, "dd-MM-yyyy")}
                  </span>
                </div>

                <div className="flex items-center w-fit text-blueLevel5 font-semibold px-2 rounded-lg space-x-1.5">
                  <BiSolidTimeFive size={15} />
                  <span className="text-xs">
                    {format(eventDate, "HH:mm")} -{" "}
                    {format(new Date(event.endTime), "HH:mm")}
                  </span>
                </div>
              </div>
              <div className="text-xl font-semibold mt-3 mb-1 line-clamp-2 ">
                <h1>{event.courseName}</h1>
              </div>

              <p className="flex items-start gap-1 text-sm">
                <MdLocationOn size={20} color="#1B4769"/> P.614 - Nhà văn hoá sinh viên
              </p>
            </div>
          );
        })}
      </div>

      {totalItems > itemsPerPage && (
        <div className="flex justify-center mt-4 pb-12">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default EventCard;
