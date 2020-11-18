import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import useInputState from '../hooks/useInputState';
import axios from '../axios/axios';

const OTPModal = () => {
  const [otp, setOTP] = useInputState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault();
    if (otp.length <= 0) {
      M.toast({ html: 'Please enter an OTP' });
    } else {
      // const data = { otp };
      // const headers = { 'Content-Type': 'application/json' };
      // const res = await axios.post('/api/users/validate', data, {
      //   headers: headers
      // });
      // if (res.status === 200) {
      //   history.push('/');
      // } else {
      //   setMsg(res.data.msg);
      // }
      if (otp === '123') {
        history.push('/');
      } else {
        M.toast({ html: 'Invalid OTP' });
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
              type='text'
              name='OTP'
              value={otp}
              onChange={setOTP}
            />
            <label htmlFor='OTP' className='active'>
              OTP
            </label>
          </div>
          {msg && <span>{msg}</span>}
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
