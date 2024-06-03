import React from 'react'
import GroupChatAvatar from '../GroupChatAvatar'
import { PiDotsThreeCircle } from "react-icons/pi";

function ChatHeader() {
  //  const dispatch = useDispatch();
  return (
    <>
    <div className='w-full px-6 py-4 shadow-lg mt-4'>
        <div className='flex items-center justify-between w-full'>
            <div className='flex'>
                <GroupChatAvatar/>
                <div>
                    <p className="font-semibold ">APN Team</p>
                    <span>Online</span>
                </div>
            </div>

            <div className=''>
            <PiDotsThreeCircle size={32}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default ChatHeader