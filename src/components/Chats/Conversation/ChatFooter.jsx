import React, { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Tooltip } from "antd";
import { LuFile, LuSticker, LuLink } from "react-icons/lu";
import { VscSmiley } from "react-icons/vsc";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { IoImageOutline, IoCameraOutline } from "react-icons/io5";
import { Fab, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: "12px !important",
      paddingBottom: "12px !important",
    },
  }));

const Actions = [
  {
    color: "#4da5fe",
    icon: <IoImageOutline size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <LuSticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <IoCameraOutline size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <LuFile size={24} />,
    y: 312,
    title: "Document",
  },
];

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
}) => {
  const [openActions, setOpenActions] = useState(false);
  return (

    <StyledInput
    
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      fullWidth
      placeholder="Nhập nội dung..."
      variant="filled"
      InputProps={{
        className: 'px-4 ',
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }} className="flex items-center">
            {/* <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el) => (
                <Tooltip placement="right" title={el.title}>
                  <Fab
                    onClick={() => {
                      setOpenActions(!openActions);
                    }}
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                    aria-label="add"
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack> */}

            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              >
                <LuLink />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <Stack sx={{ position: "relative" }} className="items-center">
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker);
                }}
              >
                <VscSmiley />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
      }}
    />
  );
};

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

function ChatFooter() {
  const [openPicker, setOpenPicker] = useState(false);

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }
  return (
    <>
      <div className="relative bg-transparent">
        <div className="bg-gray-50 shadow-md">
          <div className="flex items-center ">
            <div className="w-full">
              <div
                className={`fixed z-10  ${openPicker ? "inline" : "hidden"}`}
                style={{
                  bottom: "81px",
                  //  right: isMobile ? '20px' : sideBar.open ? '420px' : '100px',
                }}
              >
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => {
                    handleEmojiClick(emoji.native);
                  }}
                />
              </div>
              {/* Chat Input */}
              <ChatInput
                inputRef={inputRef}
                value={value}
                setValue={setValue}
                openPicker={openPicker}
                setOpenPicker={setOpenPicker}
              />
            </div>
            <div className="h-12 w-12 bg-mainColor rounded-lg flex items-center justify-center mx-2">
           
              <IconButton
                onClick={() => {
                  // const messageData = {
                  //     message: linkify(value),
                  //     conversation_id: room_id,
                  //     from: user_id,
                  //     to: current_conversation.user_id,
                  //     type: containsUrl(value) ? "Link" : "Text",
                  //   };
                  //   axios.post('/api/send_message', messageData)
                  //     .then(response => {
                  //       console.log('Success:', response.data);
                  //     })
                  //     .catch(error => {
                  //       console.error('Error:', error);
                  //     });
                }}
              >
                 <PiPaperPlaneTilt className="text-black" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatFooter;
