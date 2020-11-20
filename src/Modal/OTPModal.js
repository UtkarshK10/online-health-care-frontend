import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import useInputState from '../hooks/useInputState';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import { updateLocalStorage } from '../utils/helper';

const OTPModal = () => {
  const [otp, setOTP] = useInputState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length <= 0) {
      M.toast({ html: 'Please enter an OTP' });
    } else {
      let res;
      try {
        const data = { otp };
        const headers = { 'Content-Type': 'application/json' };
        res = await axios.post(`/api/users/validate/${auth.user_id}`, data, {
          headers: headers,
        });
        if (res.status === 200) {
          console.log(res);
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
          await setAuth({ ...resData });
          await updateLocalStorage(resData);
          history.push('/#!');
        }
      } catch (e) {
        // console.log(e?.response);
        // console.log(e?.response?.data);
        // console.log(e);
        const errorObject = (e?.response && e?.response.data) || e;
        // const { response } = e;
        // const { request, ...errorObject } = response;
        // console.log(data);
        setMsg(errorObject?.msg || 'Invalid OTP');
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
            <input type='password' name='OTP' value={otp} onChange={setOTP} />
            <label htmlFor='OTP' className='active'>
              OTP
            </label>
          </div>
          {msg && (
            <span style={{ color: '#dd2c00', fontSize: '1.5rem' }}>{msg}</span>
          )}
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
