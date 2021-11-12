import { useStateValue } from 'store/TokenProvider';
import loginService from 'services/eduzzAccounts/loginService';
import { useEffect, useState } from 'react';
import { AppRoutes } from 'routes';

function App() {
  const [{ token, expires_in }, dispatch] = useStateValue();
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [loaded, setLoaded] = useState<boolean>(false);
  const [delayToken, setDelayToken] = useState<boolean>(true);
  const handleLogin = (renoveSession = false) => {
    if (!token || renoveSession) {
      loginService.login(token => {
        dispatch({
          type: 'SET_TOKEN',
          token: token
        });
      });
    }
  };

  useEffect(() => {
    setLoaded(false);
    if (localStorage.getItem('logado') === 'true' && !token) {
      handleLogin();
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (token && expires_in) {
      if (currentTime > expires_in) {
        setLoaded(false);
        if (localStorage.getItem('logado') === 'true') {
          handleLogin(true);
          setTimeout(() => {
            setLoaded(true);
          }, 1000);
        }
      }
    }
    if (token || delayToken) {
      setDelayToken(false);
      setTimeout(() => {
        setCurrentTime(new Date().getTime());
      }, 30000);
    }
  }, [currentTime]);

  return <>{localStorage.getItem('logado') === 'true' ? loaded && <AppRoutes /> : <AppRoutes />}</>;
}

export default App;
