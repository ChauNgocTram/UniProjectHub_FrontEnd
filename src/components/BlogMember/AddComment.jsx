import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useCreateComment } from "../../api/blogApi"; // Adjust path as necessary

function AddComment({ blogId }) {
  const [comment, setComment] = useState("");
  const { mutate: createComment, isLoading } = useCreateComment();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleEmojiClick = () => {
    // Implement emoji picker logic here
  };

  const handleFileUpload = () => {
    // Implement file upload logic here
  };

  const handleSendClick = () => {
    if (!comment.trim()) {
      return; 
    }

    createComment({ blogId, description: comment }, {
      onSuccess: () => {
        setComment("");
      },
      onError: (error) => {
        console.error("Error submitting comment:", error);
      }
    });
  };

  return (
    <div className="flex items-center border-t-2 border-neutral-200 p-2 mx-3">
      <TextField
        id="comment-input"
        label="Thêm bình luận..."
        variant="outlined"
        fullWidth
        multiline
        rows={1}
        value={comment}
        onChange={handleCommentChange}
        disabled={isLoading} 
      />
      <IconButton onClick={handleEmojiClick}>
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton onClick={handleFileUpload}>
        <AttachFileIcon />
      </IconButton>
      <IconButton onClick={handleSendClick} disabled={isLoading}>
        <SendIcon className="text-blueLevel5" />
      </IconButton>
    </div>
  );
}

export default AddComment;
