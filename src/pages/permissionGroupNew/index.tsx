import React, { useEffect, useState } from 'react';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';

// components
import FormDone from 'components/formDone';
import ToastComponent from 'components/toast';
import FormSection from './components/FormSection';
import HeaderSection from 'components/headerSection';

// utils
import { CompanyService } from 'services';
import steps from './utils/steps';
import createSelectArray from 'utils/createSelectArray';
import { SelectFieldOutput } from 'models/assignPermission';

const PermissionGroupNew = () => {
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();
  const [companies, setCompanies] = useState<SelectFieldOutput[]>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const buttonPath = '/permission-groups';

  useEffect(() => {
    setCurrentStep(0);
    CompanyService.getAll()
      .then(response => {
        setCompanies(createSelectArray(response.data));
      })
      .catch(err => {
        setCompanies([]);
        setOpenToast(true);
      });
  }, []);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div>
      <HeaderSection currentStep={currentStep} steps={steps} buttonPath={buttonPath} />
      {(currentStep === 0 || currentStep === 1 || currentStep === 2) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} companies={companies} />
      )}
      {currentStep === 3 && <FormDone title={'permission-group.permission-group-done'} buttonPath={buttonPath} />}
      <ToastComponent open={openToast} string={'error.load-data-error'} handleClose={handleCloseToast} />
    </div>
  );
};

export default PermissionGroupNew;
