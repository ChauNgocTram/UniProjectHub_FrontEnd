import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";
import { Button } from "antd";
import { CREATE_PERSONAL_PROJECT } from "../../routes/constant";
import Card from "./Card/Card";
import SelectList from "../../components/SelectList";
import { useGetPersonalProject } from "../../api/projectApi"; 
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import Loading from "../../components/Loading/Loading";
import Lottie from "lottie-react";
import Empty from "../../assets/Empty.json";

const CATEGORY = ["Nhân sự", "Giáo dục", "Marketing"];

function AllPersonalProject() {
  const user = useSelector(selectUser);
  const { data: projects, isLoading, isError } = useGetPersonalProject(user.userId);

  if (isLoading) return <Loading loading={isLoading} />;

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  

  return (
    <>
      <div className="flex">
        <div className="wrapper-body w-full mt-8 mx-24">
          <SearchBar />
          {projects && projects.length > 0 ? (
            <>
              <div className="flex justify-between my-6 mx-6">
                <div className="flex justify-between w-[200px]">
                  <SelectList
                    lists={CATEGORY}
                    // Implement logic to handle category filtering
                  />
                </div>

                <NavLink to={`/${CREATE_PERSONAL_PROJECT}`} className="py-2">
                  <span className="rounded-lg py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                    + Tạo mới
                  </span>
                </NavLink>
              </div>

              <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mx-4 justify-items-center items-center w-full">
                {projects.map((project) => (
                  <Card key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center flex-col justify-center mx-auto">
              <Lottie animationData={Empty} className="w-80 h-80" />
              <div className="mt-2 mb-3 flex flex-col items-center">
                <p>Chiếc hộp này đang chờ đợi nội dung từ bạn.</p>
                <p>Hãy tạo dữ liệu mới ngay thôi!</p>
              </div>
              <NavLink to={`/${CREATE_PERSONAL_PROJECT}`} className="py-2">
                <span className="rounded-lg my-3 py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                  + Tạo mới
                </span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllPersonalProject;
