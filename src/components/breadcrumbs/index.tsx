import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// material-ui
import Typography from '@eduzz/houston-ui/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const BreadCrumbs = ({ crumbs }: any) => {
  const { t } = useTranslation('common');
  const [newCrumb, setNewCrumb] = useState(crumbs);
  const [classState, setClassState] = useState<string>('');

  useEffect(() => {
    const newArray = [...crumbs];
    if (newArray[1].path === '/billing') {
      newArray.shift();
    }
    setClassState('');
    // const lengthOfArray = newArray.length;
    // const lastPositionOfArray = newArray[lengthOfArray - 1];
    setNewCrumb(newArray);
  }, [crumbs]);

  if (newCrumb.length <= 1) {
    return null;
  }

  return (
    <div className='normal-crumb'>
      <div className={`breadCrumb ${classState}`}>
        <Link to='/'>
          <HomeOutlinedIcon fontSize='small' />
        </Link>
        <KeyboardArrowRightRoundedIcon fontSize='small' />
        {newCrumb.map(({ name, path }: any, key: any) =>
          key + 1 === newCrumb.length ? (
            <Typography key={key} fontWeight='semibold' size='normal'>
              {t(name)}
            </Typography>
          ) : (
            path !== '/' && (
              <div data-test-id='crumb' key={key}>
                <Link to={path}>{t(name)}</Link>
                <KeyboardArrowRightRoundedIcon fontSize='small' />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};
export default BreadCrumbs;
