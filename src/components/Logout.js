import { useHistory } from 'react-router-dom';
import { clearLocalStorage } from '../utils/helper';

const Logout = () => {
    const history = useHistory();
    clearLocalStorage();
    history.replace('/login')
    return null
}

export default Logout;
