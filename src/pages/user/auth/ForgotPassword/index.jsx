import React, { useState } from "react";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(2);
  };

  return (
    <div>
      {step === 1 ? (
        <ForgotPasswordStep1 onNext={() => handleNext()} />
      ) : (
        <ForgotPasswordStep2 />
      )}
    </div>
  );
};

export default ForgotPassword;
