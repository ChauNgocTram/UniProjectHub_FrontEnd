import React from "react";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import CardProject from "./CardProject/CardProject";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input } from "antd";
import { CREATE_TEAM_PROJECT } from "../../../routes/constant";
import SearchBar from "../../../components/Search/SearchBar";


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

function AllTeamProject() {
  return (
    <>
      <div className="flex ">
        <TeamSidebar />
        <div className="w-full mt-6">
          <SearchBar/>
          <div className="flex justify-between my-6">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Button onClick={(e) => e.preventDefault()}>
                <Space>
                  Danh mục
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

          

            <NavLink to={`/${CREATE_TEAM_PROJECT}`} className="py-2">
              <span className="rounded-lg py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                + Tạo mới
              </span>
            </NavLink>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mx-4 justify-items-center items-center ">
            <CardProject />
            <CardProject />
            <CardProject />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllTeamProject;
