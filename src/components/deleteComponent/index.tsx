import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  subtitle: string;
  buttonText: string;
  handleOpen: () => void;
};

const DeleteComponent = ({ subtitle, buttonText, handleOpen }: Props) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className='general-edit__delete'>
        <Typography fontWeight='bold' size='small'>
          {t('common.delete')}
        </Typography>
        <Typography fontWeight='regular' size='normal'>
          {t(subtitle)}
        </Typography>
        <Button startIcon={<DeleteIcon />} variant='outlined' onClick={handleOpen}>
          <Typography fontWeight='semibold' size='small'>
            {t(buttonText)}
          </Typography>
        </Button>
      </div>
    </>
  );
};

export default DeleteComponent;
