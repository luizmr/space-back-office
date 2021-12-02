import React, { useEffect, useState } from 'react';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';
import { useStateValue } from 'store/TokenProvider';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// components
import FormDone from 'components/formDone';
import FormSection from './components/FormSection';
import HeaderSection from 'components/headerSection';
import ToastComponent from 'components/toast';

// utils
import { SelectFieldOutput } from 'models/assignPermission';
import { CompanyService, AppService } from 'services';
import createSelectArray from 'utils/createSelectArray';
import steps from './utils/steps';

const AssignPermissionNew = () => {
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();
  const [apps, setApps] = useState<Array<SelectFieldOutput>>([]);
  const [members, setMembers] = useState<Array<SelectFieldOutput>>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [{ token }, dispatch] = useStateValue();
  const tokenUser = token ? token.split(' ')[1] : '';
  const user: any = jwt.decode(tokenUser);
  const buttonPath = '/assign-permissions';

  useEffect(() => {
    setCurrentStep(0);
    axios
      .all([AppService.getAll({ companyId: user.CompanyId }), CompanyService.getUsers(user.CompanyId)])
      .then(
        axios.spread(function (apps, users) {
          setApps(createSelectArray(apps.data));
          setMembers(createSelectArray(users.data));
        })
      )
      .catch(err => {
        setApps([]);
        setMembers([]);
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
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} apps={apps} members={members} />
      )}
      {currentStep === 3 && <FormDone title={'assignpermission.permission-done'} buttonPath={buttonPath} />}
      <ToastComponent open={openToast} string={'error.load-data-error'} handleClose={handleCloseToast} />
    </div>
  );
};

export default AssignPermissionNew;
