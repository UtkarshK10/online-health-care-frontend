import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage } from '../utils/helper';
import { AuthContext } from '../contexts/auth-context';

const Logout = ({ isDoctor }) => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const URL = isDoctor ? '/doctors/login' : '/login';
  useEffect(() => {
    setAuth(null);
    clearLocalStorage();
    return () => {
      history.replace(URL);
      window.location.reload();
    };
  }, [setAuth, history]);

  return null;
};

export default Logout;
