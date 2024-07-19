import React, { useState } from 'react';

export const multiStepContext = React.createContext();

const StepperContext = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    setFinalData([...finalData, userData]);
    setUserData({});
    setCurrentStep(3); 
    console.log('Final Data Submitted: ', userData);
  }

  return (
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
  );
};

export default StepperContext;
