import React, { useState }  from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuFolderOpen } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import { TbSocial } from "react-icons/tb";
import { useGetSummary } from "../../api/userApi";
import ProjectChart from "../../components/Admin/ProjectChart";
import UserSignupsChart from "../../components/Admin/UserSignupsChart";

function Dashboard() {
  const { data, isLoading, isError, error } = useGetSummary();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex items-center gap-5 border-2 max-w-[410px] rounded-lg shadow-md py-3 px-4 m-5">
          <div className="border-2 border-yellow-600 rounded-full p-2">
            <HiOutlineUserGroup size={50} color="#FBBF24" />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-3xl font-semibold">{data.totalUsers}</span>
            <span className="text-sm">Tài khoản</span>
          </div>
        </div>

        <div className="flex items-center gap-5 border-2 max-w-[410px] rounded-lg shadow-md py-3 px-4 m-5">
          <div className="border-2 border-green-600 rounded-full p-2">
            <LuFolderOpen size={50} color="#16A34A" />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-3xl font-semibold">{data.totalProjects}</span>
            <span className="text-sm">Dự án</span>
          </div>
        </div>

        <div className="flex items-center gap-5 border-2 max-w-[410px] rounded-lg shadow-md py-3 px-4 m-5">
          <div className="border-2 border-orange-600 rounded-full p-2">
            <RiFileList3Line size={50} color="#F97316" />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-3xl font-semibold">{data.totalTasks}</span>
            <span className="text-sm">Task</span>
          </div>
        </div>

        <div className="flex items-center gap-5 border-2 max-w-[410px] rounded-lg shadow-md py-3 px-4 m-5">
          <div className="border-2 border-cyan-600 rounded-full p-2">
            <TbSocial size={50} color="#06B6D4" />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-3xl font-semibold">{data.totalBlogs}</span>
            <span className="text-sm">Bài blog</span>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="border-2 border-neutral-200 rounded-lg shadow-lg mx-5 w-[30%]">
          <h1 className="border-b-2 border-slate-300 py-2 px-4 font-semibold">
            Phân tích dự án
          </h1>
          <ProjectChart />
        </div>
        <div className="border-2 border-neutral-200 rounded-lg shadow-lg mx-5 w-[70%]">
          <h1 className="border-b-2 border-slate-300 py-2 px-4 font-semibold">
          Số lượng người dùng tham gia
          </h1>
         <UserSignupsChart/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
