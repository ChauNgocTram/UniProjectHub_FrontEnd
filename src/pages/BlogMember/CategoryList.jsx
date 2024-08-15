import React, { useState }  from "react";
import { NavLink } from "react-router-dom";
import { useGetAllCategory } from "../../api/blogApi";
import BlogSidebar from "../../components/Sidebar/BlogSidebar";

const THEME_MAPPING = {
  "Giáo dục": ["Đại học", "Trường học", "Giáo dục"],
  "Toán học & Công nghệ": ["Toán học", "Công nghệ thông tin"],
  "Phát triển phần mềm": ["Phát triển phần mềm", "Kiểm thử phần mềm"],
  "Nghiên cứu thị trường": [
    "Nghiên cứu thị trường",
    "Marketing quốc tế",
    "Marketing ngân hàng",
    "Marketing du lịch",
    "Marketing bán lẻ",
  ],
  "Quản lý dự án": [
    "Quản lý dự án",
    "Quản trị chiến lược",
    "Quản trị logistic",
  ],
  "Nhân sự": ["Quản trị nhân lực"],
  Marketing: ["Truyền thông marketing", "Nghiên cứu Marketing"],
  "Cuộc sống sinh viên": ["Cuộc sống sinh viên", "Hoạt động sinh viên"],
  Khác: [
    "Tài liệu và báo cáo",
    "Đường lối đảng cộng sản Việt Nam",
    "Tài chính ngân hàng",
  ],
};

const CategoryList = () => {
  const { data: categories, isLoading, isError } = useGetAllCategory();

  if (isLoading) return <p>Đang tải...</p>;
  if (isError) return <p>Lỗi khi tải danh mục</p>;

  const groupedCategories = Object.entries(THEME_MAPPING).reduce(
    (acc, [theme, categoryNames]) => {
      acc[theme] = categories.filter((category) =>
        categoryNames.includes(category.name)
      );
      return acc;
    },
    {}
  );

  return (
    <div className="flex w-full mt-8">
      <BlogSidebar />
      <div className="p-6 overflow-y-auto h-[600px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent ">
        {Object.keys(groupedCategories).map((theme) => (
          <div key={theme} className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{theme}</h2>
            <ul className="mt-2 space-y-2">
              {groupedCategories[theme].map((category) => (
                <li
                  key={category.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <NavLink to={`/category/${category.id}`}>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {category.name}
                    </h3>
                    <p className="text-gray-500">{category.description}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
