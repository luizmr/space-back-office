import React, { useEffect, useState } from 'react';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';

// components
import FormDone from 'components/formDone';
import FormSection from './components/FormSection';
import HeaderSection from 'components/headerSection';
import ToastComponent from 'components/toast';

// utils
import { SelectFieldOutput } from 'models/assignPermission';
import { CompanyService } from 'services';
import createSelectArray from 'utils/createSelectArray';
import steps from './utils/steps';

const AssignPermissionNew = () => {
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();
  const [companies, setCompanies] = useState<Array<SelectFieldOutput>>([]);
  const [members, setMembers] = useState<Array<SelectFieldOutput>>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const buttonPath = '/assign-permissions';

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
      {(currentStep === 0 || currentStep === 1 || currentStep === 2 || currentStep === 3) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} companies={companies} />
      )}
      {currentStep === 4 && <FormDone title={'assignpermission.permission-done'} buttonPath={buttonPath} />}
      <ToastComponent open={openToast} string={'error.load-data-error'} handleClose={handleCloseToast} />
    </div>
  );
};

export default AssignPermissionNew;
