import React, { useEffect, useState } from 'react';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';
import { useStateValue } from 'store/TokenProvider';
import jwt from 'jsonwebtoken';

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
  const [apps, setApps] = useState<SelectFieldOutput[]>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [{ token }, dispatch] = useStateValue();
  const tokenUser = token ? token.split(' ')[1] : '';
  const user: any = jwt.decode(tokenUser);
  const buttonPath = '/permission-groups';

  useEffect(() => {
    setCurrentStep(0);
    CompanyService.getApp(user.CompanyId)
      .then(response => {
        setApps(createSelectArray(response.data));
      })
      .catch(err => {
        setApps([]);
        setOpenToast(true);
      });
  }, []);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div>
      <HeaderSection currentStep={currentStep} steps={steps} buttonPath={buttonPath} />
      {(currentStep === 0 || currentStep === 1) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} apps={apps} />
      )}
      {currentStep === 2 && <FormDone title={'permission-group.permission-group-done'} buttonPath={buttonPath} />}
      <ToastComponent open={openToast} string={'error.load-data-error'} handleClose={handleCloseToast} />
    </div>
  );
};

export default PermissionGroupNew;
