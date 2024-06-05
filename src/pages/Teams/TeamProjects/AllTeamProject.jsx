import React, { useState } from "react";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import CardProject from "./CardProject/CardProject";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input } from "antd";
import { CREATE_TEAM_PROJECT } from "../../../routes/constant";
import SearchBar from "../../../components/Search/SearchBar";
import SelectList from "../../../components/SelectList";

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

function AllTeamProject() {
  const [category, setCategory] = useState(CATEGORY[2]);
  return (
    <>
      <div className="flex ">
        <TeamSidebar />
        <div className="wrapper-body w-full mt-8">
          <SearchBar />
          <div className="flex items-center justify-between mx-6">
            <div className="flex justify-between my-6 w-[200px]">
              {/* <Dropdown
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
            </Dropdown> */}
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
            <CardProject />
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
