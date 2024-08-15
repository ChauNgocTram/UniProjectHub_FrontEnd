import React , { useState } from "react";
import { BiRepost } from "react-icons/bi";
import { MdBookmarkBorder } from "react-icons/md";
import { format } from "date-fns";
import { useGetCategoryById } from "../../api/blogApi";
import categoryStyles from "../../utils/categoryStyles"; 

function BlogDetails({ blog }) {
  const formattedDate = format(new Date(blog.createdAt), "dd/MM/yyyy HH:mm");

  const { data: category, isLoading, error } = useGetCategoryById(blog.categoryID);

  if (isLoading) return <div>Loading category...</div>;
  if (error) return <div>Error loading category: {error.message}</div>;

  const categoryStyle = categoryStyles[blog.categoryID] || "bg-gray-200 text-gray-800";

  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-textSecondary">{formattedDate}</span>
        <div className="flex items-center justify-end gap-3 px-3">
          <BiRepost
            size={30}
            className="text-textSecondary hover:text-blueLevel4 cursor-pointer"
          />
          <MdBookmarkBorder
            size={25}
            className="text-textSecondary hover:text-blueLevel4 cursor-pointer"
          />
        </div>
      </div>

      <div className="border-2 border-neutral-300 py-5 px-6 text-justify rounded-xl">
        <div className="flex items-center mb-2 gap-5">
          <span className="font-semibold text-lg text-blueLevel4">{blog.name}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-xl shadow-md ${categoryStyle}`}>
            {category ? category.name : "Category not found"}
          </span>
        </div>

        <p className="text-sm" style={{ lineHeight: '1.6' }}>
          {blog.description}
        </p>
      </div>
    </div>
  );
}

export default BlogDetails;
