import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles: any = makeStyles({
  card: {
    width: 144,
    height: 133
  }
});

type Props = {
  icon: any;
  index: number;
  path: { new: any; dashboard: string };
  pathIsTrue: boolean;
};

const CardDashboard = ({ icon, index, path, pathIsTrue }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const names = [
    t('dashboard.company'),
    t('dashboard.user'),
    t('dashboard.app'),
    t('dashboard.permission-group'),
    t('dashboard.permission'),
    t('dashboard.assign-permission')
  ];

  return (
    <>
      <Link to={`${path.dashboard}`} key={index} className={'dashboard__card-link'}>
        <Card className={`dashboard__card-link__header ${classes.card}`}>
          <Link
            to={{
              pathname: `${path.new}`
            }}
            className='dashboard__add-link'
          >
            <AddIcon
              className='dashboard__button-new'
              fontSize='small'
              style={pathIsTrue ? { visibility: 'visible' } : { visibility: 'hidden' }}
            />
          </Link>

          <CardContent className='dashboard__card-link__header-content'>
            <span className='icon'>{icon}</span>
            <span> {names[index]} </span>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CardDashboard;
