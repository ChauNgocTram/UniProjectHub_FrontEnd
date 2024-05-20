import React from "react";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import CardProject from "./CardProject/CardProject";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input } from "antd";
import { CREATE_TEAM_PROJECT } from "../../../routes/constant";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

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
      <div className="flex">
        <TeamSidebar />
        <div className="w-full mt-8 ">
          <div className="flex justify-between">
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

            <Search
              placeholder="Tìm kiếm nội dung..."
              allowClear
              onSearch={onSearch}
              style={{
                width: 400,
              }}
            />

            <NavLink to={`/${CREATE_TEAM_PROJECT}`} className="py-2">
              <span className="rounded-lg py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
                + Tạo mới
              </span>
            </NavLink>
          </div>

          <div className="flex gap-x-6 mt-8">
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
