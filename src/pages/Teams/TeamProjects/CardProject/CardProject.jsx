import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { ALL_TASK, EDIT_TEAM_PROJECT } from "../../../../routes/constant";
import ProjectAvatar from "../../../../components/ProjectAvatar";
import DeleteTeamProject from "../../ManageTeamProject/DeleteTeamProject";
import { Dialog,DialogTitle,DialogPanel, Transition,TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

const CardProject = ({ project, onDelete }) => {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [urlToShare, setUrlToShare] = useState("");
  const [copied, setCopied] = useState(false);

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

  return (
    <>
      {project.map((item) => (
        <div
          key={item.id}
          className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-lg border-2 border-neutral-200 pt-3 px-2"
        >
          <div className="flex justify-between border-b-2 border-neutral-200 px-3">
            <div className="text-sm text-neutral-400">{item.createdAt}</div>
            <div className="flex items-center space-x-3 pb-3">
              <button onClick={() => handleFavorite(item.id)}>
                {favorites.includes(item.id) ? <FaBookmark color="#FFD700" /> : <FaRegBookmark />}
              </button>
              <button onClick={() => handleShare(window.location.origin + `/du-an-nhom/${ALL_TASK.replace(":id", item.id)}`)}>
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
                        <DeleteTeamProject
                          project={item}
                          onDelete={onDelete}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex items-start gap-0 mx-0 mt-4 mb-2 min-h-20 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <ProjectAvatar cardName={item} />
            <div className="flex w-full flex-col gap-0.5 pr-3">
              <NavLink to={`/du-an-nhom/${ALL_TASK.replace(":id", item.id)}`}>
                <h5 className="line-clamp-2 text-lg antialiased font-semibold leading-snug tracking-normal text-blueLevel5 hover:text-blueLevel4">
                  {item.name}
                </h5>
              </NavLink>

              <p className="block text-base antialiased font-light leading-relaxed text-blue-gray-900">
                {item.nameLeader}
                {/* {item.typeOfSpace} */}
              </p>
            </div>
          </div>

          <div className="px-3 line-clamp-1 text-sm mb-2 italic">
            {item.description}
          </div>

          
        </div>
      ))}

      <Transition show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Share Project URL
                      </DialogTitle>
                      <div className="mt-2 space-y-3">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={urlToShare}
                          readOnly
                        />
                        <button
                          className="mt-12 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleCopy}
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardProject;
