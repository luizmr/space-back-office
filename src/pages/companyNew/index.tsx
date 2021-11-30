import React, { useEffect } from 'react';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';

// components
import FormDone from 'components/formDone';
import FormSection from './components/FormSection';
import HeaderSection from 'components/headerSection';

// utils
import steps from './utils/steps';

const CompanyNew = () => {
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();

  const buttonPath = '/companies';

  useEffect(() => {
    setCurrentStep(0);
  }, []);

  return (
    <div>
      <HeaderSection currentStep={currentStep} steps={steps} buttonPath={buttonPath} />
      {(currentStep === 0 || currentStep === 1) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && <FormDone title={'company.company-done'} buttonPath={buttonPath} />}
    </div>
  );
};

export default CompanyNew;
