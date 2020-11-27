import React, { useState, useRef, useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Redirect } from 'react-router-dom'
import { updateLocalStorage } from '../../utils/helper';


const CaptchaPage = ({ match }) => {
    const [token, setToken] = useState(null);
    const [msg, setMsg] = useState(null);
    const recaptchaRef = useRef();
    const { addressId } = match.params;
    const { auth, setAuth } = useContext(AuthContext);
    const handleConfirmation = async () => {
        if (!token || token?.length === 0) {
            M.toast({ html: 'Please complete the captcha' })
            return;
        }
        confirmOrder();
        // let remoteIp = null;
        // await axios.get('https://jsonip.com/')
        //     .then(res => {
        //         remoteIp = res.data.ip;
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     })
        // axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        //     params: {
        //         'secret': process.env.REACT_APP_reCAPTCHA_SECRET_KEY_V2,
        //         'response': token,
        //         'remoteip': remoteIp
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //         const { success } = res.data;
        //         if (success) {
        //             confirmOrder();
        //         } else {
        //             M.toast({ html: 'Invalid Token' })
        //         }
        //     })
        //     .catch(e => {
        //         recaptchaRef.current.reset();
        //         console.log(e);
        //     })
        //     .finally(() => {
        //         recaptchaRef.current.reset();
        //     })

    }
    const confirmOrder = () => {
        console.log("confirmOrder");
        const data = { address_id: addressId }
        axios.post('/api/orders/confirm', data, {
            headers: {
                'api-token': auth?.token
            }
        })
            .then(res => {
                setMsg(res.data.msg);
                setAuth({ ...auth, credits: res.data.new_credits })
                updateLocalStorage({ ...auth, credits: res.data.new_credits });
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                redirectUser();
            })
    }
    const redirectUser = () => {
        setTimeout(() => {
            if (auth?.token) {
                <Redirect to='/shopping/orders' />
            } else {
                <Redirect to='/shopping/home' />
            }
        }, 10000)
    }
    return (
        <div className="container">
            {(!msg)
                ? (
                    <>
                        <div className="row">
                            <div className="col s12">
                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_reCAPTCHA_KEY_V2}
                                    onChange={token => setToken(token)}
                                    ref={recaptchaRef}
                                    type="image"
                                    theme="light"
                                    badge="inline"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className='input-field'>
                                    <button disabled={msg && msg.length > 0} onClick={e => {
                                        e.preventDefault();
                                        handleConfirmation();
                                    }} className='btn btn-large pcolour btn-register waves-effect waves-light hover'>
                                        Confirm
                        <i className='material-icons right'>check_circle</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) :
                (
                    <div className="row center">
                        <div className="col s12">
                            {msg && <h4>{msg}</h4>}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CaptchaPage
