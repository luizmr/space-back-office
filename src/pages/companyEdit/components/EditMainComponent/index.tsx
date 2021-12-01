import React from 'react';
import Informations from '../Informations';
import EditForm from '../EditForm';
import { CompanyOutput } from 'models/company';

type Props = {
  company: CompanyOutput;
  setCompany: React.Dispatch<React.SetStateAction<CompanyOutput>>;
};

const EditMainComponent = ({ company, setCompany }: Props) => {
  return (
    <>
      <Informations company={company} />
      <EditForm company={company} setCompany={setCompany} />
    </>
  );
};

export default EditMainComponent;
