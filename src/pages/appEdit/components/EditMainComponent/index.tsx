import React from 'react';
import Informations from '../Informations';
import EditForm from '../EditForm';
import { AppOutput } from 'models/app';

type Props = {
  app: AppOutput;
  setApp: React.Dispatch<React.SetStateAction<AppOutput>>;
  slugValid: number;
  setSlugValid: React.Dispatch<React.SetStateAction<number>>;
};

const EditMainComponent = ({ app, setApp, slugValid, setSlugValid }: Props) => {
  return (
    <>
      <Informations app={app} />
      <EditForm app={app} setApp={setApp} slugValid={slugValid} setSlugValid={setSlugValid} />
    </>
  );
};

export default EditMainComponent;
