import React, { useState } from 'react';
import RESET from '../assets/reset.png';
import axios from '../axios/axios';
import M from 'materialize-css/dist/js/materialize.min.js';
// import { } from 'react-router-dom';

const Forget = ({ match, midRoute }) => {
  const { token } = match.params;
  const [fields, setFields] = useState({
    password1: '',
    password2: '',
  });
  const [msg, setMsg] = useState(null);
  const onChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password1 !== password2) {
      M.toast({ html: 'Passwords does not match' })
      return;
    }
    const data = { password: password1 }
    axios.put(`/api/${midRoute}/reset/${token}`, data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        setMsg(res.data.msg);
      })
      .catch(err => {
        if (err?.response) {

        } else if (err?.request) {

        } else {
          console.log(err)
        }
      })
  };
  const { password1, password2 } = fields;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 l6 offset-l3 offset-m2'>
          <div className='card' style={{ margin: '20px 0px' }}>
            <div className='card-image'>
              <img src={RESET} alt='money' className='reset-photo' />
            </div>
            <div className='card-title ptcolour' style={{ fontWeight: '600' }}>
              Reset Password
            </div>
            <div className='forget-form'>
              <form onSubmit={onSubmit}>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={password1}
                      onChange={onChange}
                      type='password'
                      id='password1'
                      name='password1'
                      className='validate'
                    />
                    <label htmlFor='password1'>Password</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={password2}
                      onChange={onChange}
                      type='password'
                      id='password2'
                      name='password2'
                      className='validate'
                    />
                    <label htmlFor='password2'>Confirm Password</label>
                  </div>
                </div>
                <div className='row'>
                  <button
                    className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                    onClick={onSubmit}
                  >
                    RESET
                    <i className='material-icons right'>check</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Forget;
