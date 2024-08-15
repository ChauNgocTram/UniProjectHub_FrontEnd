import React, { useState }  from "react";
import BlogSidebar from "../../components/Sidebar/BlogSidebar";
import BlogUserInfo from "../../components/BlogMember/BlogUserInfo";
import BlogDetails from "../../components/BlogMember/BlogDetails";
import Comment from "../../components/BlogMember/Comment";
import AddComment from "../../components/BlogMember/AddComment";
import { GrAdd } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { CREATE_BLOG } from "../../routes/constant";
import { useGetBlogs, useGetCommentOfBlog } from "../../api/blogApi";
import Loading from "../../components/Loading/Loading";

function BlogMember() {
  const { data: blogs, isLoading: isLoadingBlogs, error: errorBlogs } = useGetBlogs();

  if (isLoadingBlogs) {
    return <Loading loading={isLoadingBlogs} />;
  }
  if (errorBlogs) return <div>Error: {errorBlogs.message}</div>;

  const sortedBlogs = blogs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className="flex w-full mt-8">
        <BlogSidebar />

        <div className="flex flex-col w-full mr-10">
          <div className="bg-slate-100 shadow-md rounded-lg flex justify-between items-center w-full my-6 px-6 py-2">
            <span className="font-semibold text-xl text-blueLevel4">
              UniProjectHub
            </span>

            <div className="flex items-center gap-4">
              <span className="font-bold text-xl text-blueLevel5">
                Blog Member
              </span>
              <span>|</span>
              <NavLink
                to={`/${CREATE_BLOG}`}
                className="bg-blueLevel5 text-white font-medium p-2 rounded-lg flex items-center"
              >
                <GrAdd size={15} className="mr-2" />
                Tạo blog
              </NavLink>
            </div>
          </div>

          <div className="overflow-y-auto h-[500px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent flex flex-col items-center justify-start">
            {sortedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center w-full justify-start border-2 rounded-lg border-neutral-200 mb-5"
              >
                <BlogUserInfo blog={blog} />
                <div className="flex flex-col w-full">
                  <BlogDetails blog={blog} />

                  <CommentsSection blogId={blog.id} />

                  <AddComment blogId={blog.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CommentsSection({ blogId }) {
  const { data: comments, isLoading, error } = useGetCommentOfBlog(blogId);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Comment comments={comments} />;
}

export default BlogMember;
