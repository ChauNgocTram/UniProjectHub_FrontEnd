import React, { useEffect, useState } from "react";

const ProgressBar = ({ progress, loader, files }) => {
  const [activeClass, setActiveClass] = useState("default");

  useEffect(() => {
    if(Math.round(progress) < 1){
        return setActiveClass('default')
    }
    else if(Math.round(progress) < 99){
        return setActiveClass('bad')
    }
    else if(Math.round(progress) == 100 && !loader){
        return setActiveClass('good')
    }
    else if(Math.round(progress) <= 100){
        return setActiveClass('fair')
    }
  }, [progress, loader])

  return (
    <div className="progress__wrapper flex items-center justify-between">
      <p className="text upload__count text-[12px] mr-[10px]">
        {files.length} file{files.length > 1 ? "s" : ""}
      </p>

      <div className={`upload__progress__container h-[10px] flex flex-1 rounded-[100px] overflow-hidden border border-solid border-slate-200 bg-slate-200 relative ${activeClass}`}>
        <div className="progress h-[10px] rounded-[51px] block absolute left-0 top-0 transition duration-[400ms]" style={{ width: progress + "%" }}></div>
      </div>

      <p className={`text percentage text-[12px] ml-[10px] ${activeClass}`}>{progress}%</p>
    </div>
  );
};

export default ProgressBar;
