import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { ALL_TASK, EDIT_TEAM_PROJECT } from "../../../../routes/constant";
import ProjectAvatar from "../../../../components/ProjectAvatar";
import DeleteTeamProject from "../../ManageTeamProject/DeleteTeamProject";
import { format } from "date-fns";
import ShareModal from "../../../../components/Modal/ShareModal";
import { BsTags } from "react-icons/bs";
import { PiMedal } from "react-icons/pi";
import { useMemberByProjectId } from "../../../../api/memberOfProjectApi";
import UserInfo from "../../../../components/UserInfo/UserInfo";

const CardProject = ({ project, onDelete }) => {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [urlToShare, setUrlToShare] = useState("");
  const [copied, setCopied] = useState(false);

  //const { data: members, isLoading, error } = useMemberByProjectId(project.id);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleShare = (url) => {
    setUrlToShare(url);
    setShowModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(urlToShare).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCopied(false);
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };


  return (
    <>
      {project.map((item) => (
        <div
          key={item.id}
          className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-lg border-2 border-neutral-200 pt-3 px-2"
        >
          <div className="flex justify-between border-b-2 border-neutral-200 px-3">
            <div className="text-sm text-neutral-400">
            {isValidDate(item.createdAt) ? (
                format(new Date(item.createdAt), "dd-MM-yyyy")
              ) : (
                "Invalid Date"
              )}
            </div>
            <div className="flex items-center space-x-3 pb-3">
              <button onClick={() => handleFavorite(item.id)}>
                {favorites.includes(item.id) ? (
                  <FaBookmark color="#FFD700" />
                ) : (
                  <FaRegBookmark />
                )}
              </button>
              <button
                onClick={() =>
                  handleShare(
                    window.location.origin +
                      `/du-an-nhom/${ALL_TASK.replace(":id", item.id)}`
                  )
                }
              >
                <FiShare2 />
              </button>

              {item.isOwner && (
                <div className="group relative cursor-pointer">
                  <span>
                    <BsThreeDotsVertical className="transition-all duration-200" />
                  </span>
                  <div className="absolute -right-16 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                    <ul className="space-y-3">
                      <li>
                        <NavLink
                          className="inline-block w-full rounded-md p-2 hover:bg-mainBg/20 text-center"
                          to={`/${EDIT_TEAM_PROJECT.replace(":id", item.id)}`}
                        >
                          Chỉnh sửa
                        </NavLink>
                      </li>

                      <li>
                        <DeleteTeamProject project={item} onDelete={onDelete} />
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex  gap-0 mx-0 mt-4 mb-1 min-h-20 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <div className="flex w-full flex-col gap-0.5 pr-3">
              <div className="flex items-center ">
                <ProjectAvatar cardName={item} />
                <NavLink to={`/du-an-nhom/${ALL_TASK.replace(":id", item.id)}`}>
                  <h5 className="line-clamp-2 text-lg antialiased font-semibold leading-snug tracking-normal text-blueLevel5 hover:text-blueLevel4">
                    {item.name}
                  </h5>
                </NavLink>
              </div>

              <div className="flex flex-col px-3 py-2 gap-1">
                <p className="flex items-center text-sm antialiased font-light leading-relaxed text-blue-gray-900">
                  <PiMedal size={15} className="mr-1" />
                  Leader:{" "}
                  <span className="font-medium ml-2">{item.nameLeader}</span>
                </p>

                <p className="text-sm flex items-center font-light text-blue-gray-900">
                  <BsTags size={15} className="mr-1" />
                  Danh mục:{" "}
                  <span className="font-medium ml-2">
                    {item.typeOfSpace}
                  </span>{" "}
                </p>

              </div>
            </div>
          </div>
        </div>
      ))}

      <ShareModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        urlToShare={urlToShare}
        handleCopy={handleCopy}
        copied={copied}
      />
    </>
  );
};

export default CardProject;
