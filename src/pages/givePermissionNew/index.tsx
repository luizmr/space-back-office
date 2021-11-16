import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';
import FormDone from './components/FormDone';
import FormSection from './components/FormSection';
import HeaderSection from './components/HeaderSection';

const GiverPermissionNew = () => {
  const { t } = useTranslation('common');
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();

  useEffect(() => {
    setCurrentStep(0);
  }, []);

  return (
    <div>
      <HeaderSection currentStep={currentStep} />
      {(currentStep === 0 || currentStep === 1) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && <FormDone />}
    </div>
  );
};

export default GiverPermissionNew;
