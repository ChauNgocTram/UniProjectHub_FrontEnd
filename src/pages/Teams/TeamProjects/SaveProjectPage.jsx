import React, { useEffect, useState } from "react";
import CardProject from "./CardProject/CardProject";
import { useGetProjectsByIds } from "../../../api/projectApi";
import Loading from "../../../components/Loading/Loading";
import TeamSidebar from "../../../components/Sidebar/TeamSidebar";
import SearchBar from "../../../components/Search/SearchBar";

const SavedProjectsPage = () => {
  const [projectIds, setProjectIds] = useState([]);
  const {
    data: projects = [],
    isLoading,
    error,
  } = useGetProjectsByIds(projectIds);

  useEffect(() => {
    const savedProjectIds = JSON.parse(localStorage.getItem("favorites")) || [];
    setProjectIds(savedProjectIds);
  }, []);

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>Error loading projects</div>;
  }

  return (
    <div className="flex mt-10">
      <TeamSidebar />
      <div className="wrapper-body w-full mt-2">
      <SearchBar />
        <h1 className="text-2xl font-bold mb-4 mx-6">Dự án đã lưu</h1>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-6">
            <CardProject
              project={projects}
              onDelete={(id) => {
                const updatedProjects = projects.filter(
                  (proj) => proj.id !== id
                );
                setProjectIds(updatedProjects.map((proj) => proj.id));
                localStorage.setItem(
                  "favorites",
                  JSON.stringify(updatedProjects.map((proj) => proj.id))
                );
              }}
            />
          </div>
        ) : (
          <p className="text-gray-500 mx-6">Chưa có dự án nào được lưu.</p>
        )}
      </div>
    </div>
  );
};

export default SavedProjectsPage;
