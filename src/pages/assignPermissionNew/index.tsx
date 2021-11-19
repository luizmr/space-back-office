import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useProgress from '@eduzz/houston-ui/Progress/useProgress';
import { useStateValue } from 'store/TokenProvider';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// components
import FormDone from './components/FormDone';
import FormSection from './components/FormSection';
import HeaderSection from './components/HeaderSection';

// utils
import { SelectFieldOutput } from 'models/assignPermission';
import createSelectArray from 'utils/createSelectArray';
import mock from './mock.json';
import { CompanyService } from 'services';
import ToastComponent from 'components/toast';

const AssignPermissionNew = () => {
  const { t } = useTranslation('common');
  const { nextStep, backStep, setCurrentStep, currentStep } = useProgress();
  const [apps, setApps] = useState<Array<SelectFieldOutput>>([]);
  const [members, setMembers] = useState<Array<SelectFieldOutput>>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [{ token }, dispatch] = useStateValue();
  const tokenUser = token ? token.split(' ')[1] : '';
  const user: any = jwt.decode(tokenUser);

  useEffect(() => {
    setCurrentStep(0);
    axios
      .all([CompanyService.getApp(user.CompanyId), CompanyService.getUsers(user.CompanyId)])
      .then(
        axios.spread(function (apps, users) {
          // setApps(createSelectArray(apps.data));
          setApps(createSelectArray(mock.apps));
          // setMembers(createSelectArray(users.data));
          setMembers(createSelectArray(mock.apps));
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
      <HeaderSection currentStep={currentStep} />
      {(currentStep === 0 || currentStep === 1 || currentStep === 2) && (
        <FormSection currentStep={currentStep} setCurrentStep={setCurrentStep} apps={apps} members={members} />
      )}
      {currentStep === 3 && <FormDone />}
      <ToastComponent open={false} string={t('error.load-data-error')} handleClose={handleCloseToast} />
    </div>
  );
};

export default AssignPermissionNew;
