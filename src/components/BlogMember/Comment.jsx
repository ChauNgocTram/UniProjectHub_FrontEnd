import React, { useState } from "react";
import avtDefault from "../../assets/images/avtDefault.png";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeleteComment } from "../../api/blogApi";
import Swal from 'sweetalert2'; // Import SweetAlert2

function Comment({ comments, blogId }) {
  const [showAll, setShowAll] = useState(false);
  const [visibleComments, setVisibleComments] = useState(2);
  const { mutate: deleteComment } = useDeleteComment();
  
  const user = useSelector(selectUser);
  const owner = user.userId;

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setVisibleComments(comments.length);
    } else {
      setVisibleComments(2);
    }
  };

  const handleDelete = async (commentId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-blueLevel5 hover:bg-blueLevel3 text-white hover:text-textPrimary mx-3 px-4 py-2 rounded',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white mx-3 px-4 py-2 rounded',
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: 'Bạn muốn xoá bình luận?',
      text: 'Bình luận này sẽ bị xoá khỏi bài blog',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
      reverseButtons: true,
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      try {
        await deleteComment(commentId);
      } catch (error) {
        console.error('Delete comment error:', error);
      }
    }
  };

  return (
    <>
      <div className="px-5 pt-2 pb-7">
        <p className="mb-3 font-semibold text-lg">Bình luận ({comments.length})</p>
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="flex gap-3 items-start justify-between px-5 my-5">
            <div className="flex gap-4 items-start">
              <img
                src={avtDefault}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-base">User123</p>
                <p className="text-sm text-textSecondary">{format(new Date(comment.createdAt), "dd-MM-yyyy HH:mm:ss")}</p>
                <p className="mt-1 text-justify text-sm">
                  {comment.description}
                </p>
              </div>
            </div>
            <div>
              {owner === comment.ownerId && (
                <div className="group relative cursor-pointer mt-1">
                  <span>
                    <BsThreeDotsVertical className="transition-all duration-200" />
                  </span>
                  <div className="absolute -right-16 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                    <ul className="space-y-3 text-red-600">
                      <li onClick={() => handleDelete(comment.id)}>Xoá bình luận</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {comments.length > 2 && (
          <button
            className="text-blue-500 cursor-pointer"
            onClick={toggleShowAll}
          >
            {showAll ? "Ẩn bớt" : "Xem thêm..."}
          </button>
        )}
      </div>
    </>
  );
}

export default Comment;
