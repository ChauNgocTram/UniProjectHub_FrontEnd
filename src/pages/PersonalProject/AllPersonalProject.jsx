import React from 'react'
import { NavLink } from 'react-router-dom';
import SearchBar from "../../components/Search/SearchBar"
import { Button, Dropdown, Space } from 'antd'
import { DownOutlined } from "@ant-design/icons";
import { CREATE_PERSONAL_PROJECT } from '../../routes/constant';
import Card from './Card/Card';

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

function AllPersonalProject() {
  return (
    <>
    <div className="flex ">
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

        

          <NavLink to={`/${CREATE_PERSONAL_PROJECT}`} className="py-2">
            <span className="rounded-lg py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
              + Tạo mới
            </span>
          </NavLink>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mx-4 justify-items-center items-center w-full">
          <Card/>
        </div>
      </div>
    </div>
  </>
  )
}

export default AllPersonalProject