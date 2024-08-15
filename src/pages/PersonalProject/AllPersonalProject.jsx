import React, { useState }  from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";
import { CREATE_PERSONAL_PROJECT } from "../../routes/constant";
import Card from "./Card/Card";
import { useGetPersonalProject } from "../../api/projectApi";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import Loading from "../../components/Loading/Loading";
import Lottie from "lottie-react";
import Empty from "../../assets/Empty.json";
import PersonalSideBar from "../../components/Sidebar/PersonalSidebar";

function AllPersonalProject() {
  const user = useSelector(selectUser);
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetPersonalProject(user.userId);

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
      <div className="flex mt-10">
        <PersonalSideBar/>
        <div className="wrapper-body w-full mt-2">
          <SearchBar />
          {projects && projects.length > 0 ? (
            <>
             
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mx-4 mt-6 justify-items-center items-center ">
                <Card project={projects} />
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
