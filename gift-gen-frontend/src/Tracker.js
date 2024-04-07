// Tracker.js
import React from 'react';

const steps = ["Create Image", "Choose Gift", "Preview Gift", "Payment"];

const Tracker = ({ currentStep }) => {
  return (
    <div className="tracker-container">
      {steps.map((step, index) => (
        <div key={step} className={`tracker-step ${currentStep === index ? 'active' : ''}`}>
          {step}
        </div>
      ))}
    </div>
  );
};

export default Tracker;
