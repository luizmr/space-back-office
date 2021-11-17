// Material-ui/icons
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@mui/material/Skeleton';

const useStyles: any = makeStyles({
  card: {
    width: 144,
    height: 133,
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

type Props = {
  newButton: boolean;
};

const CardDashboardSkeleton = ({ newButton }: Props) => {
  const classes = useStyles();
  return (
    <div className='dashboard__card-link'>
      <Card className={`dashboard__skeleton-card ${classes.card}`}>
        {newButton && (
          <Skeleton variant='circular' animation='wave' width={15} height={15} className='dashboard__button-skeleton' />
        )}
        <Skeleton
          variant='rectangular'
          animation={'wave'}
          width={35}
          height={35}
          style={{
            marginBottom: '20px',
            marginTop: '8px'
          }}
        />
        <Skeleton variant='rectangular' animation={'wave'} height={40} width={100} />
      </Card>
    </div>
  );
};

export default CardDashboardSkeleton;
