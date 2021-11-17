import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@eduzz/houston-ui/Typography';

// Components
import ToastComponent from 'components/toast';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import CardDashboard from './components/CardDashboard';
import SkeletonFinalPage from './components/SkeletonFinalPage';

// Interfaces
import { DashboardCardOutput } from 'models/dashboard';

const Dashboard = () => {
  const { t } = useTranslation('common');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<DashboardCardOutput[]>([
    {
      icon: <SupervisedUserCircleOutlinedIcon style={{ alignSelf: 'center' }} fontSize='large' />,
      slug: 'assign-permission',
      path: { new: '/assign-permission/new', dashboard: '/assign-permission' },
      pathIsTrue: true
    }
  ]);

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <div className='dashboard'>
        <div className='dashboard__header'>
          <Typography size='large' fontWeight='semibold'>
            {t('dashboard.title')}
          </Typography>
          <Typography size='normal' fontWeight='regular'>
            {t('dashboard.subtitle')}
          </Typography>
        </div>
      </div>
      {!loading ? (
        <div className='dashboard mt-small'>
          <div className='dashboard__content'>
            {cards.map(({ icon, slug, path, pathIsTrue }: DashboardCardOutput, index: number) => (
              <CardDashboard icon={icon} index={index} path={path} key={slug} pathIsTrue={pathIsTrue} />
            ))}
          </div>
        </div>
      ) : (
        <SkeletonFinalPage cards={cards} fullDashboard={false} />
      )}
      <ToastComponent
        open={openSnackbar}
        string={t('error.dashboard-error')}
        type={'warning'}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default Dashboard;
