import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useInputState from '../hooks/useInputState';
import '../styles/UserRegistrationStyles.css';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import doctor from '../assets/doctor.png';
import { saveLocalStorage } from '../utils/helper';
import AddTechModal from '../Modal/OTPModal';
import ReactSpinner from './ReactSpinner';

function UserLogin(props) {
  const [password, handlePasswordChange] = useInputState('');
  const [email, handleEmailChange] = useInputState('');
  const [openModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  const [propData, setPropData] = useState(null);

  const getOTP = () => {
    var elem = document.querySelector('.modal');
    var instance = M.Modal.init(elem, { dismissible: false });
    instance.open();
  };

  useEffect(() => {
    if (openModal) getOTP();
    // eslint-disable-next-line
  }, [openModal]);
  useEffect(() => {
    if (auth?.token) {
      history.push('/');
    }
  }, [auth?.token, history]);

  useEffect(() => {
    return () => window.location.reload();
  }, []);


  const login = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    // const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regularExpressionEmail.test(email)) {
      M.toast({ html: 'Please enter a valid email id' });
    } else if (password.length < 6) {
      M.toast({
        html: 'Password should be of minimum 6 characters',
      });
    } else {
      setLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      axios
        .post('/api/users/login', data, {
          headers: headers,
        })
        .then((res) => {
          if (res.status === 200 && res.data.msg === 'unverified') {
            const resData = {
              username: res.data.username,
            };
            setAuth(resData);
            setLoading(false);
            setModal(true);
          } else if (res.status === 200) {
            const resData = {
              credits: res.data.total_credit,
              isLoggedIn: true,
              token: res.data.jwt_token,
              tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
            };
            setAuth(resData);
            saveLocalStorage(resData);
            setLoading(false);
            history.push('/');
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.data?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModal(true);
    const data = {
      title:
        "Enter your user account's verified email address and we will send you a password reset link.",
      btnText: 'Send reset link',
      label: 'Email',
    };
    setPropData(data);
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
              <form onSubmit={login} className='padding-form form-shadow'>
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
                <p className='right-align'>
                  <Link
                    to='#'
                    onClick={handleClick}
                    className='text-secondary waves-effect'
                  >
                    Forgot password?
                  </Link>
                </p>
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
                      <button className='btn btn-large pcolour btn-register waves-effect waves-light glow'>
                        Login
                        <i className='material-icons right'>check_circle</i>
                      </button>
                    </div>
                  )}
                  {loading && <ReactSpinner size={35} />}
                </div>
              </form>
              <span>New to App?</span>{' '}
              <Link to='/signup' className='text-secondary waves-effect'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AddTechModal info={propData} />
    </>
  );
}

export default UserLogin;
