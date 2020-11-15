import React, { useState } from 'react';
import useInputState from '../hooks/useInputState';
import '../styles/UserRegistrationStyles.css';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
import doctor from '../assets/doctor.png';

function UserRegistration(props) {
  const [name, handleNameChange] = useInputState('');
  const [username, handleUserNameChange] = useInputState('');
  const [password, handlePasswordChange] = useInputState('');
  const [email, handleEmailChange] = useInputState('');
  const [phone, handlePhoneChange] = useInputState('');
  const [age, handleAgeChange] = useInputState('');
  const [reg, setReg] = useState(false);
  const [msg, setMsg] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const data = {
      name,
      username,
      password,
      email,
      phone,
      age,
    };
    var regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var phoneno = /^\d{10}$/;
    var regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
      const res = await axios.post('http://127.0.0.1:5000/register', data, {
        headers: headers,
      });
      console.log('response', res);

      //clear input
      //redirect user or show response
      setReg(true);
      setMsg(res.data.message);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col hide-on-small-and-down m7 l7'>
          <img className='responsive-img center' src={doctor} alt='doctor' />
        </div>
        <div className='col s12 m5 l5'>
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
              <div className='input-field'>
                <div className='gender-male'>
                  <label>
                    <input className='with-gap' name='gender' type='radio' />
                    <span>Male</span>
                  </label>
                </div>
                <div className='gender-female'>
                  <label>
                    <input className='with-gap' name='gender' type='radio' />
                    <span>Female</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='input-field'>
                <button className='btn btn-large purple btn-register waves-effect waves-light'>
                  Register
                  <i className='material-icons right'>done</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p>{reg && msg.toString()}</p>
    </div>
  );
}

export default UserRegistration;
