// import clsx from "clsx";

// import React, { useState, useRef } from "react";

// import {
//   MdOutlineMessage,
// } from "react-icons/md";
// import { RxActivityLog } from "react-icons/rx";
// import { useParams } from "react-router-dom";
// //import { toast } from "sonner";
// import Tabs from "../../../../../components/Tabs/Tabs";
// import { PRIOTITYSTYELS,  getInitials } from "../../../../../utils";
// //import Loading from "../components/Loader";
// import Button from "../../../../../components/Button";


// import { Editor } from "@tinymce/tinymce-react";




// function Activities({ activity, id }) {
//     const [content, setContent] = useState("");
  
//         const handleEditorChange = (content) => {
//           setContent(content);
//           console.log("Content was updated:", content);
//         };
//         const editorRef = useRef(null);
//         const log = () => {
//           if (editorRef.current) {
//             console.log(editorRef.current.getContent());
//           }
//         };
      
//         //const [selected, setSelected] = useState(act_types[0]);
//         const [text, setText] = useState("");
//         const isLoading = false;
      
//         const handleSubmit = async () => {};
      
//         const Card = ({ item }) => {
//           return (
//             <div className="flex space-x-4">
//               <div className="flex flex-col items-center flex-shrink-0">
//                 <div className="w-10 h-10 flex items-center justify-center">
//                   {/* {TASKTYPEICON[item?.type]} */}
//                   <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
//                     <MdOutlineMessage />
//                   </div>
//                 </div>
//                 <div className="w-full flex items-center">
//                   <div className="w-0.5 bg-gray-300 h-full"></div>
//                 </div>
//               </div>
      
//               <div className="flex flex-col gap-y-1 mb-8">
//                 {/* <p className="font-semibold">{item?.by?.name}</p> */}
//                 <p className="font-semibold">Chau Ngoc Tram</p>
//                 <div className="text-gray-500 space-y-2">
//                   {/* <span className="text-sm">{moment(item?.date).fromNow()}</span>  */}
      
//                   <span className="text-sm">17 phút trước</span>
//                 </div>
//                 <div className="text-gray-700">Code UI</div>
//               </div>
//             </div>
//           );
//         };
      
//         return (
//           <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
//             <div className="w-full md:w-1/2">
//               <h4 className="text-gray-600 font-semibold text-lg mb-5">Hoạt động</h4>
      
//               <div className="w-full">
//                 {/* {activity?.map((el, index) => ( */}
//                 <Card
//                 // key={index}
//                 // item={el}
//                 // isConnected={index < activity.length - 1}
//                 />
//                 {/* ))} */}
//               </div>
//             </div>
      
//             <div className="w-full md:w-1/2">
//               {/* <div className="w-full flex flex-wrap gap-5">
//                 <textarea
//                   rows={6}
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   placeholder="Nhập nội dung ......"
//                   className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
//                 ></textarea>
//                 {isLoading ? (
//                   <Loading />
//                 ) : ( 
//                 <Button
//                   type="button"
//                   label="Gửi"
//                   onClick={handleSubmit}
//                   className="bg-blue-600 text-white rounded"
//                 />
//                  )} 
//               </div> */}
      
//               {/* ======================================= */}
      
//               <Editor
//               // apiKey="YOUR_TINYMCE_API_KEY"
//               onInit={(_evt, editor) => (editorRef.current = editor)}
//               initialValue="<p>Write something awesome...</p>"
//               init={{
//                 height: 400,
//                 menubar: false,
//                 plugins: [
//                   'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                   'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                   'insertdatetime', 'media', 'table', 'code', 'wordcount'
//                 ],
//                 toolbar:
//                   "undo redo | blocks | " +
//                   "bold italic forecolor | alignleft aligncenter " +
//                   "alignright alignjustify | bullist numlist outdent indent | " +
//                   "removeformat | help",
//                 branding: false,  
//                 content_style:
//                   "body { font-family: Montserrat, sans-serif; font-size:14px }",
//               }}
//               onEditorChange={handleEditorChange}
//             />
//               <Button
//                 type="button"
//                 label="Gửi"
//                 onClick={handleSubmit}
//                 className="bg-mainColor text-white font-bold rounded"
//               />
//             </div>
//           </div>
//         );
// }

// export default Activities