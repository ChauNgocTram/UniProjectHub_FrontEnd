import React, { useState }  from "react";
import { useParams } from "react-router-dom";
import BlogSidebar from "../../components/Sidebar/BlogSidebar";
import BlogUserInfo from "../../components/BlogMember/BlogUserInfo";
import BlogDetails from "../../components/BlogMember/BlogDetails";
import Comment from "../../components/BlogMember/Comment";
import AddComment from "../../components/BlogMember/AddComment";
import Loading from "../../components/Loading/Loading";
import { useGetBlogByCategory, useGetCategoryById, useGetCommentOfBlog } from "../../api/blogApi";
import { MdArrowBackIosNew } from "react-icons/md";

const CategoryBlogs = () => {
  const { categoryId } = useParams();
  const { data: blogs, isLoading, isError } = useGetBlogByCategory(categoryId);
  const { data: category } = useGetCategoryById(categoryId);
  if (isLoading) return <Loading loading={isLoading} />;
  if (isError) return <div>Error: {isError.message}</div>;

  const sortedBlogs = blogs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex w-full mt-8">
      <BlogSidebar />
      <div className="flex flex-col w-full mr-10">
     
        <div className="bg-slate-100 shadow-md rounded-lg flex items-center w-full my-6 px-6 py-2">
        <div
          onClick={() => window.history.back()}
          className="mx-4 p-3 rounded-lg hover:bg-slate-200"
        >
          <div className="">
            <MdArrowBackIosNew />
          </div>
        </div>
          <span className="font-semibold text-xl text-blueLevel4">
            {category.name}
          </span>
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
  );
};

function CommentsSection({ blogId }) {
  const { data: comments, isLoading, isError } = useGetCommentOfBlog(blogId);

  if (isLoading) return <div>Loading comments...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return <Comment comments={comments} />;
}

export default CategoryBlogs;
