import React, { useContext, useState } from "react";
import TeamSidebar from "../../../../components/Sidebar/TeamSidebar";
import FirstStep from "./stepper/steps/FirstStep";
import SecondStep from "./stepper/steps/SecondStep";
import Stepper from "./stepper/Stepper";
import ThirdStep from "./stepper/steps/ThirdStep";
import { multiStepContext } from "./stepper/StepperContext";
import api from "../../../../config/axios";
import { alert } from "../../../../components/Alert/Alert";

function CreateTeam() {
  const { currentStep, finalData } = useContext(multiStepContext);

  const steps = ["Thông tin dự án", "Thành viên", "Hoàn tất"];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex">
        <TeamSidebar />
        <div className=" mt-12 mx-12 md:mx-24 md:px-24 wrapper-body">
          <div>
            <p className="pb-2 text-xl font-semibold border-b border-neutral-900">
              Hãy xây dựng một Không gian làm việc
            </p>
            <p className="my-3">
              Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập
              bảng ở một vị trí.
            </p>
          </div>

          <div>
            <Stepper steps={steps} currentStep={currentStep - 1} />
            <div className="my-4 p-5 md:mx-24">{displaySteps(currentStep)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTeam;
