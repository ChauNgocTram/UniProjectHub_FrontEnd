import React, { useEffect, useState } from "react";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import CardProject from "./CardProject/CardProject";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input } from "antd";
import { CREATE_TEAM_PROJECT } from "../../../routes/constant";
import SearchBar from "../../../components/Search/SearchBar";
import SelectList from "../../../components/SelectList";
import Loading from "../../../components/Loading/Loading";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";
import Empty from "../../../assets/Empty.json";
import { useGetGroupProjectsByUser } from "../../../api/projectApi";
import NoDataPlaceholder from "../../../components/NoDataPlaceholder";


const CATEGORY = ["Nhân sự", "Giáo dục", "Marketing"];

function AllTeamProject() {
  const user = useSelector(selectUser);
  const [category, setCategory] = useState(CATEGORY[2]);

  const {
    data: projects,
    isLoading,
    error,
  } = useGetGroupProjectsByUser(user.userId);

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>Error loading projects</div>;
  }

  // const formattedProjects =
  //   projects?.map((project) => ({
  //     ...project,
  //     createdAt: format(new Date(project.createdAt), "dd/MM/yyyy"),
  //   })) || [];

  const messageLines = [
    "Chiếc hộp này đang chờ đợi nội dung từ bạn.",
    "Hãy tạo dữ liệu mới ngay thôi!",
  ];

  return (
    <div className="flex ">
      <TeamSidebar />
      <div className="wrapper-body w-full mt-8">
        <SearchBar />
        {projects.length > 0 ? (
          <>
            <div className="flex items-center justify-between mx-6">
              <div className="flex justify-between my-6 w-[200px]">
                <SelectList
                  lists={CATEGORY}
                  selected={category}
                  setSelected={setCategory}
                  className="w-[200px]"
                />
              </div>
              <div>
                <NavLink to={`/${CREATE_TEAM_PROJECT}`} className="py-2">
                  <span className="rounded-lg py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                    + Tạo mới
                  </span>
                </NavLink>
              </div>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mx-4 justify-items-center items-center ">
              <CardProject project={projects} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center flex-col justify-center mx-auto">
              <NoDataPlaceholder
                animationData={Empty}
                messageLines={messageLines}
              />
              <NavLink to={`/${CREATE_TEAM_PROJECT}`} className="py-2">
                <span className="rounded-lg my-3 py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                  + Tạo mới
                </span>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AllTeamProject;
