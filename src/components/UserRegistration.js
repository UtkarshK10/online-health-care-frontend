import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useInputState from '../hooks/useInputState';
import '../styles/UserRegistrationStyles.css';
import axios from '../axios/axios';
// import axios from 'axios';
import { AuthContext } from '../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import doctor from '../assets/doctor.png';
import { saveLocalStorage } from '../utils/helper';
import { useSpring, animated } from 'react-spring';
import AddTechModal from '../Modal/OTPModal';

function UserRegistration(props) {
  const [name, handleNameChange] = useInputState('');
  const [username, handleUserNameChange] = useInputState('');
  const [password, handlePasswordChange] = useInputState('');
  const [email, handleEmailChange] = useInputState('');
  const [phone, handlePhoneChange] = useInputState('');
  const [age, handleAgeChange] = useInputState('');
  const [gender, handleGender] = useInputState('');
  const [error, setError] = useState(false);
  const [openModal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [state, toggle] = useState(true);

  const { setAuth } = useContext(AuthContext);

  //user signup and validation

  const register = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone,
      username,
      password,
      age,
      gender,
    };
    const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const phoneno = /^\d{10}$/;
    const regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name === '') {
      M.toast({ html: 'Name cannot be empty' });
    } else if (username === '') {
      M.toast({ html: 'Username cannot be empty' });
    } else if (password.length < 6) {
      M.toast({
        html: 'Password should be of minimum 6 characters.',
      });
    } else if (!regularExpressionPassword.test(password)) {
      M.toast({
        html:
          'Password should contain atleast one number and one special character',
      });
    } else if (!regularExpressionEmail.test(email)) {
      M.toast({ html: 'Please enter a valid email id.' });
    } else if (!phoneno.test(phone)) {
      M.toast({ html: 'Please enter a valid phone number.' });
    } else if (age.value < 0 && age.value > 100) {
      M.toast({ html: 'Please enter a valid age.' });
    } else {
      const headers = { 'Content-Type': 'application/json' };
      //signup
      const res = await axios.post('/api/users/', data, {
        headers: headers,
      });

      try {
        if (res.status === 201) {
          // const resData = {
          //   name: res.data.name,
          //   username: res.data.username,
          //   user_id: res.data.user_id,
          //   email: res.data.email,
          //   gender: res.data.gender,
          //   phone: res.data.phone,
          //   age: res.data.age,
          //   credits: res.data.total_credit,
          //   profile_image: res.data.profile_url,
          //   isLoggedIn: true,
          //   token: res.data.jwt_token,
          //   tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
          // };
          const resData = {
            user_id: res.data.user_id
          }
          setAuth(resData);
          setModal(true);
        }
      } catch (e) {
        const { response } = e;
        const { request, ...errorObject } = response;
        setError(true);
        setErrorMsg(errorObject.data.msg);
      }
    }
  };

  //Modal part
  const getOTP = () => {
    var elem = document.querySelector('.modal');
    var instance = M.Modal.init(elem, { dismissible: false });
    instance.open();
  };

  useEffect(() => {
    if (openModal) getOTP();
    // eslint-disable-next-line
  }, [openModal]);

  //animation part

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1500 },
  });

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col hide-on-small-and-down m7 l7'>
            <div>
              <animated.div
                style={{
                  opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
                  transform: x
                    .interpolate({
                      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                      output: [0.6, 0.7, 0.8, 0.9, 1, 1.05, 1],
                    })
                    .interpolate((x) => `scale(${x})`),
                }}
              >
                <img
                  className='responsive-img center'
                  src={doctor}
                  alt='doctor'
                />
              </animated.div>
            </div>
          </div>
          <div className='col s12 m5 l5'>
            <div id='slide'>
              <form onSubmit={register} className='padding-form'>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={name}
                      onChange={handleNameChange}
                      type='text'
                      id='name'
                      className='validate'
                    />
                    <label htmlFor='name'>Name</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={username}
                      onChange={handleUserNameChange}
                      type='text'
                      id='username'
                      className='validate'
                    />
                    <label htmlFor='username'>Username</label>
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
                      value={phone}
                      onChange={handlePhoneChange}
                      id='phno'
                      type='text'
                      className='validate'
                    />
                    <label htmlFor='phno'>Mobile No.</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={age}
                      onChange={handleAgeChange}
                      id='age'
                      type='number'
                      className='validate'
                      min='1'
                      max='100'
                    />
                    <label htmlFor='age'>Age</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field' onChange={handleGender}>
                    <div className='gender-male'>
                      <label>
                        <input
                          className='with-gap'
                          name='gender'
                          type='radio'
                          value='male'
                        />
                        <span>Male</span>
                      </label>
                    </div>
                    <div className='gender-female'>
                      <label>
                        <input
                          className='with-gap'
                          name='gender'
                          type='radio'
                          value='female'
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <button className='btn btn-large pcolour btn-register waves-effect waves-light hover'>
                      Register
                      <i className='material-icons right'>check_circle</i>
                    </button>
                  </div>
                </div>
              </form>
              <span>
                Already registered?{' '}
                <Link to='/login' className='stcolour'>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
        <p>{error && errorMsg.toString()}</p>
      </div>
      <AddTechModal />
    </>
  );
}

export default UserRegistration;
