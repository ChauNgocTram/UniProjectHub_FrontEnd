import React from "react";
import BlogSidebar from "../../components/Sidebar/BlogSidebar";
import BlogUserInfo from "../../components/BlogMember/BlogUserInfo";
import BlogDetails from "../../components/BlogMember/BlogDetails";
import Comment from "../../components/BlogMember/Comment";
import AddComment from "../../components/BlogMember/AddComment";
import { GrAdd } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { CREATE_BLOG } from "../../routes/constant";

function BlogMember() {
  return (
    <>
      <div className="flex w-full">
        <BlogSidebar />

        <div className="flex flex-col w-full mr-10">
          <div className="bg-slate-100 shadow-md rounded-lg flex justify-between items-center w-full my-10 px-6 py-3">
            <span className="font-semibold text-xl text-blueLevel4">
              UniProjectHub
            </span>

            <div className="flex items-center gap-4">
              <span className="font-bold text-xl text-blueLevel5">
                Blog Member
              </span>
              <span>|</span>
              <NavLink  to={`/${CREATE_BLOG}`} className="bg-blueLevel5 text-white font-medium p-2 rounded-lg flex items-center">
                <GrAdd size={15} className="mr-2"/>
                Tạo blog
              </NavLink>
            </div>
          </div>

          {/* bắt đầu duyệt mảng từ khúc này trở xuống để get all blog nha anh Phi !!!*/}

          <div className="flex items-center justify-start border-2 rounded-lg border-neutral-200">
            <BlogUserInfo />

            <div className="flex flex-col w-full">
              <BlogDetails />

              <Comment />
              {/* ô input comment */}
              <AddComment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogMember;
