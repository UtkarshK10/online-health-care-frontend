import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useInputState from '../hooks/useInputState';
import '../styles/UserRegistrationStyles.css';
import axios from '../axios/axios';
// import axios from 'axios';
import { AuthContext } from '../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import doctor from '../assets/doctor.png';
import { saveLocalStorage } from '../utils/helper';
import AddTechModal from '../Modal/OTPModal';
import ReactSpinner from './ReactSpinner';

function UserLogin(props) {
  const [password, handlePasswordChange] = useInputState('');
  const [email, handleEmailChange] = useInputState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);
  const history = useHistory();

  const getOTP = () => {
    var elem = document.querySelector('.modal');
    var instance = M.Modal.init(elem, { dismissible: false });
    instance.open();
  };

  useEffect(() => {
    if (openModal) getOTP();
    // eslint-disable-next-line
  }, [openModal]);

  const login = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    // const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regularExpressionEmail.test(email)) {
      M.toast({ html: 'Please enter a valid email id.' });
    } else if (password.length < 6) {
      M.toast({
        html: 'Password should be of minimum 6 characters.',
      });
    } else {
      const headers = { 'Content-Type': 'application/json' };
      axios.post('/api/users/login', data, {
        headers: headers,
      })
        .then(res => {
          if (res.status === 200 && res.data.msg === 'unverified') {
            const resData = {
              user_id: res.data.user_id,
            };
            setAuth(resData);
            setModal(true);
          } else if (res.status === 200) {
            const resData = {
              name: res.data.name,
              username: res.data.username,
              user_id: res.data.user_id,
              email: res.data.email,
              gender: res.data.gender,
              phone: res.data.phone,
              age: res.data.age,
              credits: res.data.total_credit,
              profile_image: res.data.profile_url,
              isLoggedIn: true,
              token: res.data.jwt_token,
              tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
            };
            setAuth(resData);
            saveLocalStorage(resData);
            history.push('/');
          }
        })
        .catch(err => {
          setLoading(false);
          setError(true);
          if (err?.response) {
            setErrorMsg(err?.response.data.msg)
          } else if (err?.request) {
            setErrorMsg(err?.request.data.toString())
          } else {
            console.log(err)
            setErrorMsg("Something went wrong, please try again");
          }
        })
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col hide-on-small-and-down m7 l7'>
            <img className='responsive-img center' src={doctor} alt='doctor' />
          </div>
          <div className='col s12 m5 l5'>
            <div id='slide'>
              <form onSubmit={login} className='padding-form'>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={email}
                      onChange={handleEmailChange}
                      id='email'
                      type='email'
                      className='validate'
                    />
                    <label htmlFor='email'>Email</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={password}
                      onChange={handlePasswordChange}
                      id='password'
                      type='password'
                      className='validate'
                    />
                    <label htmlFor='password'>Password</label>
                  </div>
                </div>

                <div className='row'>
                  {!loading && (
                    <div className='input-field'>
                      <button className='btn btn-large pcolour btn-register waves-effect waves-light hover'>
                        Login
                        <i className='material-icons right'>check_circle</i>
                      </button>
                    </div>
                  )}
                  {loading && <ReactSpinner size={25} />}
                </div>
              </form>
              <span>New to App?</span>{' '}
              <Link to='/signup' className='stcolour'>
                Register
              </Link>
            </div>
          </div>
        </div>
        <p>{error && errorMsg.toString()}</p>
      </div>
      <AddTechModal />
    </>
  );
}

export default UserLogin;
