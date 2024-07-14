import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send"; // Import icon Send

function AddComment() {
  const [comment, setComment] = useState("");

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
    // Implement submit logic here, e.g., send comment to server
    console.log("Comment submitted:", comment);
    // Reset comment input
    setComment("");
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
      />
      <IconButton onClick={handleEmojiClick}>
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton onClick={handleFileUpload}>
        <AttachFileIcon />
      </IconButton>
      <IconButton onClick={handleSendClick} >
        <SendIcon className=" text-blueLevel5 "/>
      </IconButton>
    </div>
  );
}

export default AddComment;
