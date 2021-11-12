import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useStateValue } from 'store/TokenProvider';
import loginService from 'services/eduzzAccounts/loginService';

function Login() {
  const [token, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('fromLogin', 'true');
    loginService.login(function (token) {
      dispatch({
        type: 'SET_TOKEN',
        token: token
      });
      history.push('/');
    });
  }, [dispatch, history]);
  return null;
}

export default Login;
