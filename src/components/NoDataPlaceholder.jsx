import React from 'react';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';

const NoDataPlaceholder = ({ animationData, messageLines, navLink, navLinkText }) => {
  return (
    <div className="flex items-center flex-col justify-center mx-auto">
      <Lottie animationData={animationData} className="w-80 h-80" />
      <div className="mt-2 mb-3 flex flex-col items-center">
        {messageLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {/* <NavLink to={navLink} className="py-2">
        <span className="rounded-lg my-3 py-2 px-2 font-medium bg-mainBg text-black hover:bg-hoverBtn">
          {navLinkText}
        </span>
      </NavLink> */}
    </div>
  );
};

export default NoDataPlaceholder;
