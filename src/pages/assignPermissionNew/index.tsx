import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';

// components
import FormDone from './components/FormDone';
import FormSection from './components/FormSection';
import HeaderSection from './components/HeaderSection';

// utils
import { SelectFieldOutput } from 'models/assignPermission';
import createSelectArray from 'utils/createSelectArray';
import mock from './mock.json';

const AssignPermissionNew = () => {
  const { t } = useTranslation('common');
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();
  const [apps, setApps] = useState<Array<SelectFieldOutput>>([]);
  const [members, setMembers] = useState<Array<SelectFieldOutput>>([]);

  useEffect(() => {
    setCurrentStep(0);
    setApps(createSelectArray(mock.apps));
    setMembers(createSelectArray(mock.users));
  }, []);

  return (
    <div>
      <HeaderSection currentStep={currentStep} />
      {(currentStep === 0 || currentStep === 1 || currentStep === 2) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} apps={apps} members={members} />
      )}
      {currentStep === 3 && <FormDone />}
    </div>
  );
};

export default AssignPermissionNew;
