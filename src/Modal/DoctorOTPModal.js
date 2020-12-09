import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import useInputState from '../hooks/useInputState';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import { saveLocalStorage } from '../utils/helper';

const DoctorOTPModal = (props) => {
  const [otp, setOTP] = useInputState('');
  const [email, setEmail] = useInputState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);

  const closeInstance = () => {
    var elem = document.querySelector('.dmodal');
    var instance = M.Modal.init(elem, { dismissible: false, opacity: 0.7 });
    instance.close();
  };

  const handleSubmit = async (e) => {
    const regexForNumbers = /\d+/;
    e.preventDefault();
    if (!props?.info) {
      if (otp.length <= 0) {
        M.toast({ html: 'Please enter an OTP' });
      } else if (!regexForNumbers.test(otp)) {
        M.toast({ html: "OTP can't have alphabets" });
      } else {
        const data = { otp };
        const headers = { 'Content-Type': 'application/json' };

        axios
          .post(`/api/doctors/validate/${auth?.username}`, data, {
            headers: headers,
          })
          .then((res) => {
            if (res.status === 200) {
              const resData = {
                isLoggedIn: true,
                token: res.data.jwt_token,
                tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
              };
              setAuth(resData);
              saveLocalStorage(resData);
              history.push('/doctors');
            }
          })
          .catch((err) => {
            if (err?.response) {
              M.toast({ html: err?.response?.data?.msg });
            } else if (err?.request) {
              M.toast({ html: err?.request?.toString() });
            } else {
              M.toast({ html: 'Something went wrong, please try again' });
            }
          });
      }
    }
    if (props?.info) {
      const data = {
        email,
        protocol: window.location.protocol,
        host: window.location.host,
      };
      axios
        .post('/api/doctors/reset', data, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((res) => {
          setMsg(res.data.msg);
          setTimeout(() => {
            closeInstance();
          }, 10000);
        })
        .catch((err) => {
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    }
  };

  return (
    <div id='OtpModal' className='modal dmodal bgsecondary'>
      <div className='modal-content'>
        <h4>
          {props?.info
            ? props?.info?.title
            : 'Enter the OTP to verify your email'}
        </h4>
        <div className='row'>
          <br />
          {!props?.info ? (
            <div className='input-field'>
              <input
                autoFocus
                type='password'
                name='OTP'
                value={otp}
                onChange={setOTP}
              />
              <label htmlFor='OTP' className='active'>
                OTP
              </label>
            </div>
          ) : (
            <div className='input-field'>
              <input
                autoFocus
                type='email'
                name='Email'
                value={email}
                onChange={setEmail}
              />
              <label htmlFor='Email' className='active'>
                Email
              </label>
            </div>
          )}
          {msg && (
            <span style={{ color: '#dd2c00', fontSize: '1.5rem' }}>{msg}</span>
          )}
        </div>
      </div>
      <div className='modal-footer bgsecondary'>
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

export default DoctorOTPModal;
