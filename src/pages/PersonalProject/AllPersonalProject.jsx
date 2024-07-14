import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CREATE_PERSONAL_PROJECT } from "../../routes/constant";
import Card from "./Card/Card";
import SelectList from "../../components/SelectList";
import api from "../../config/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { format } from "date-fns";
import Loading from "../../components/Loading/Loading";
import Lottie from "lottie-react";
import Empty from "../../assets/Empty.json";

const items = [
  {
    label: <a href="https://www.antgroup.com">Nhân sự</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">Giáo dục</a>,
    key: "1",
  },
];

const CATEGORY = ["Nhân sự", "Giáo dục", "Marketing"];

function AllPersonalProject() {
  const user = useSelector(selectUser);
  const [category, setCategory] = useState(CATEGORY[2]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reloadContent, setReloadContent] = useState(false);
  const handleReloadContent = () => {
    setReloadContent((prev) => !prev);
  };

  const getAllPersonalProject = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/Project/GetProjectsByUserOwner/${user.userId}`
      );
      if (response.data && response.data.length > 0) {
        const filteredProjects = response.data.filter(
          (project) => !project.isGroup
        );
        const formattedProjects = filteredProjects.map((project) => ({
          ...project,
          createdAt: format(new Date(project.createdAt), "dd/MM/yyyy"),
        }));

        setProjects(formattedProjects);

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPersonalProject();
  }, [reloadContent]);

  return (
    <>
      {/* {loading ? (
        <Loading loading={loading} />
      ) : ( */}
        <div className="flex ">
          <div className="wrapper-body w-full mt-8 mx-24">
            <SearchBar />
            {projects.length > 0 ? (
              <>
                <div className="flex justify-between my-6 mx-6">
                  <div className="flex justify-between w-[200px]">
                    <SelectList
                      lists={CATEGORY}
                      selected={category}
                      setSelected={setCategory}
                      className="w-[100px]"
                    />
                  </div>

                  <NavLink to={`/${CREATE_PERSONAL_PROJECT}`} className="py-2">
                    <span className="rounded-lg py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                      + Tạo mới
                    </span>
                  </NavLink>
                </div>

                <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mx-4 justify-items-center items-center w-full">
                  <Card
                    project={projects}
                    handleReloadContent={handleReloadContent}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center flex-col justify-center  mx-auto">
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
      {/* )} */}
    </>
  );
}

export default AllPersonalProject;
