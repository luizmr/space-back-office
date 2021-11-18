// material-ui/icons
import Typography from '@eduzz/houston-ui/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// const theme1: any = createTheme({
//   components: {
//     MuiDialogTitle: {
//       styleOverrides: {
//         root: {
// padding: '20px',
// fontWeight: 600,
// fontSize: '1.25rem',
// lineHeight: '24px',
// border: 'none',
// width: '100%',
// color: '#fff'
//         }
//       }
//     },
//     MuiDialogContent: {
//       styleOverrides: {
//         root: {
//           padding: '32px !important'
//         }
//       }
//     },
//     MuiFormControl: {
//       styleOverrides: {
//         root: {
//           height: '45px !important'
//         }
//       }
//     },
//     MuiInputBase: {
//       styleOverrides: {
//         root: {
//           height: '45px !important'
//         }
//       }
//     },
//     MuiCircularProgress: {
//       styleOverrides: {
//         root: {
// margin: '100px auto !important',
// display: 'flex'
//         }
//       }
//     }
//   }
// });

type Props = {
  modalShow: boolean;
  backgroundColor?: string;
  headerColor?: string;
  icon?: any;
  headerText: string;
  bodyClass?: string;
  bodyContent: any;
  editHeader?: boolean;
  trashButton?: any;
  loading?: boolean;
  modalClass?: string;
};

export default function ModalPanel({
  modalShow,
  backgroundColor = '#0D47A1',
  headerColor = '#fff',
  icon,
  headerText,
  bodyClass = 'body-content',
  bodyContent,
  editHeader = false,
  trashButton,
  loading = false,
  modalClass = 'modal-panel'
}: Props) {
  const theme2 = useTheme();
  const fullScreen = useMediaQuery(theme2.breakpoints.down('sm'));
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={modalShow}
        className={modalClass}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' style={{ backgroundColor: `${backgroundColor}`, color: `${headerColor}` }}>
          {editHeader ? (
            <div className='modal-panel__edit-header'>
              <Typography fontWeight='regular' size='large'>
                {headerText}
              </Typography>
              {!loading && <>{trashButton}</>}
            </div>
          ) : (
            <>
              {icon ? (
                <>
                  {icon}
                  <Typography fontWeight='regular' size='large' className='header-text-icon'>
                    {headerText}
                  </Typography>
                </>
              ) : (
                <Typography fontWeight='regular' size='large'>
                  {headerText}
                </Typography>
              )}
            </>
          )}
        </DialogTitle>
        {loading ? (
          <DialogContent>
            <CircularProgress
              style={
                backgroundColor === '#ffca28'
                  ? { color: '#ffca28' }
                  : backgroundColor === '#F44336'
                  ? { color: '#F44336' }
                  : { color: '#0d47a1' }
              }
              size={150}
            />
          </DialogContent>
        ) : (
          <DialogContent className={`${bodyClass}`}>{bodyContent}</DialogContent>
        )}
      </Dialog>
    </>
  );
}
