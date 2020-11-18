import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useInputState from '../hooks/useInputState';
import '../styles/UserRegistrationStyles.css';
import axios from '../axios/axios';
// import axios from 'axios';
import { AuthContext } from '../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import doctor from '../assets/doctor.png';
import { saveLocalStorage } from '../utils/helper';

function UserLogin(props) {
    const [password, handlePasswordChange] = useInputState('');
    const [email, handleEmailChange] = useInputState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { setAuth } = useContext(AuthContext);
    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };
        const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        const regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regularExpressionEmail.test(email)) {
            M.toast({ html: 'Please enter a valid email id.' });
        } else if (password.length < 6) {
            M.toast({
                html: 'Password should be of minimum 6 characters.',
            });
        } else if (!regularExpressionPassword.test(password)) {
            M.toast({
                html:
                    'Password should contain atleast one number and one special character',
            });
        } else {
            const headers = { 'Content-Type': 'application/json' };
            //login
            const res = await axios.post('/api/users/login', data, {
                headers: headers,
            });

            console.log(res);

            if (res.status === 200) {
                const resData = {
                    token: res.data.jwt_token,
                    username: res.data.username,
                    user_id: res.data.user_id,
                    isLoggedIn: true,
                    tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24
                };
                setAuth(resData);
                saveLocalStorage('userData', resData);
                history.push('/');
            } else {
                setError(true);
                setErrorMsg(res.data.msg);
            }
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col hide-on-small-and-down m7 l7'>
                    <img className='responsive-img center' src={doctor} alt='doctor' />
                </div>
                <div className='col s12 m5 l5'>
                    <div id='slide'>
                        <form onSubmit={register} className='padding-form'>
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
                                <div className='input-field'>
                                    <button className='btn btn-large purple btn-register waves-effect waves-light'>
                                        Login
                    <i className='material-icons right'>check_circle</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <span>New to App?</span> <Link to='/signup'>Register</Link>
                    </div>
                </div>
            </div>
            <p>{error && errorMsg.toString()}</p>
        </div>
    );
}

export default UserLogin;
