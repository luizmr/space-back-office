import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from '@eduzz/houston-ui/Toast';

type Props = {
  open: boolean;
  string: string;
  type?: any;
  handleClose: () => void;
  callClose?: boolean;
};

export default function ToastComponent({ open, string, type = 'error', handleClose, callClose = true }: Props) {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (open) {
      type === 'success' &&
        callClose &&
        Toast.success(t(string), {
          onOpen: () => {
            setTimeout(() => {
              handleClose();
            }, 3000);
          }
        });
      type === 'success' && !callClose && Toast.success(t(string));
      type === 'error' &&
        Toast.error(t(string), {
          onOpen: () => {
            setTimeout(() => {
              handleClose();
            }, 3000);
          }
        });
      type === 'warning' &&
        Toast.info(t(string), {
          onOpen: () => {
            setTimeout(() => {
              handleClose();
            }, 3000);
          }
        });
    }
  }, [open]);

  return <span></span>;
}
