import React, { useState } from "react";

export const multiStepContext = React.createContext();
const StepperContext = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
    setUserData("");
    setCurrentStep(1);
    console.log("Final Data Submitted: ", userData);
  }
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setCurrentStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
          submitData,
        }}
      >
        {children}
      </multiStepContext.Provider>
    </div>
  );
};

export default StepperContext;
