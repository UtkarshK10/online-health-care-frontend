import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import useInputState from '../hooks/useInputState';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';

const OTPModal = () => {
  const [otp, setOTP] = useInputState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const handleSubmit = async e => {
    e.preventDefault();
    if (otp.length <= 0) {
      M.toast({ html: 'Please enter an OTP' });
    } else {
      let res;
      try {
        const data = { otp };
        const headers = { 'Content-Type': 'application/json', 'api-token': auth.token };
        res = await axios.post('/api/users/validate', data, {
          headers: headers
        });
        if (res.status === 200) {
          history.push('/');
        }
      } catch (e) {
        const { response } = e;
        const { request, ...errorObject } = response;
        // console.log(errorObject);
        setMsg(errorObject.data.msg);
      }
    }
  };

  return (
    <div id='OtpModal' className='modal'>
      <div className='modal-content'>
        <h4>Enter the OTP to verify your email</h4>
        <div className='row'>
          <br />
          <div className='input-field'>
            <input
              type='password'
              name='OTP'
              value={otp}
              onChange={setOTP}
            />
            <label htmlFor='OTP' className='active'>
              OTP
            </label>
          </div>
          {msg && <span style={{ color: '#dd2c00', fontSize: '1.5rem' }}>{msg}</span>}
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={handleSubmit}
          className='purple waves-effect btn secondary-content'
        >
          Verify
        </a>
      </div>
    </div>
  );
};

export default OTPModal;
