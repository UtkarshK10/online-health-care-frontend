import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import useInputState from '../hooks/useInputState';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import { updateLocalStorage } from '../utils/helper';

const OTPModal = (props) => {
  const [otp, setOTP] = useInputState('');
  const [email, setEmail] = useInputState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);

  const closeInstance = () => {
    var elem = document.querySelector('.umodal');
    var instance = M.Modal.init(elem, { dismissible: false, opacity: 0.7 });
    instance.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!props?.info) {
      if (otp.length <= 0) {
        M.toast({ html: 'Please enter an OTP' });
      } else {
        const data = { otp };
        const headers = { 'Content-Type': 'application/json' };
        axios.post(`/api/users/validate/${auth.username}`, data, {
          headers: headers,
        })
          .then(res => {
            if (res.status === 200) {

              const resData = {
                credits: res.data.total_credit,
                isLoggedIn: true,
                token: res.data.jwt_token,
                tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
              };
              setAuth({ ...resData });
              updateLocalStorage(resData);
              history.push('/#!');
            }
          })
          .catch(err => {
            if (err?.response) {
              setMsg(err?.response.data.msg)
            } else if (err?.request) {
              setMsg(err?.request.data.toString())
            } else {
              console.log(err)
              setMsg("Something went wrong, please try again");
            }
          })
      }
    }
    if (props?.info) {
      const data = { email }
      axios.post('/api/users/reset', data, {
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(res => {
          setMsg(res.data.msg);
          setTimeout(() => {
            closeInstance()
          }, 10000);
        })
        .catch(err => {
          if (err?.response) {

          } else if (err?.request) {

          } else {
            console.log(err)
          }
        })
    }
  };

  return (
    <div id='OtpModal' className='modal umodal'>
      <div className='modal-content'>
        <h4>{props?.info ? props?.info?.title : 'Enter the OTP to verify your email'}</h4>
        <div className='row'>
          <br />
          {!props?.info
            ?
            <div className='input-field'>
              <input autoFocus type='password' name='OTP' value={otp} onChange={setOTP} />
              <label htmlFor='OTP' className='active'>
                OTP
            </label>
            </div>
            :
            <div className='input-field'>
              <input autoFocus type='email' name='Email' value={email} onChange={setEmail} />
              <label htmlFor='Email' className='active'>
                Email
            </label>
            </div>
          }
          {msg && (
            <span style={{ color: '#dd2c00', fontSize: '1.5rem' }}>{msg}</span>
          )}
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={handleSubmit}
          className='scolour waves-effect btn secondary-content'
        >
          {props?.info ? props?.info?.btnText : 'Verify'}
        </a>
      </div>
    </div>
  );
};

export default OTPModal;
