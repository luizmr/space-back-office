import React, { useEffect } from 'react';
import Toast from '@eduzz/houston-ui/Toast';

type Props = {
  open: boolean;
  string: string;
  type?: any;
  handleClose: () => void;
  callClose?: boolean;
};

export default function ToastComponent({ open, string, type = 'error', handleClose, callClose = true }: Props) {
  useEffect(() => {
    if (open) {
      type === 'success' &&
        callClose &&
        Toast.success(string, {
          onOpen: () => {
            setTimeout(() => {
              handleClose();
            }, 3000);
          }
        });
      type === 'success' && !callClose && Toast.success(string);
      type === 'error' &&
        Toast.error(string, {
          onOpen: () => {
            setTimeout(() => {
              handleClose();
            }, 3000);
          }
        });
      type === 'warning' &&
        Toast.info(string, {
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
