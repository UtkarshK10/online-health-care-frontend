import React, { useState, useRef, useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Redirect } from 'react-router-dom';
import { updateLocalStorage } from '../../utils/helper';
// import HCaptcha from '@hcaptcha/react-hcaptcha';
import successOrder from '../../assets/confirmed.png';

const CaptchaPage = ({ match }) => {
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const captchaRef = useRef();
  const { addressId } = match.params;
  const { auth, setAuth } = useContext(AuthContext);
  const handleConfirmation = async () => {
    if (!token || token?.length === 0) {
      M.toast({ html: 'Please complete the captcha' });
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

    // axios.post('https://hcaptcha.com/siteverify', null, {
    //     params: {
    //         'secret': process.env.REACT_APP_reCAPTCHA_SECRET_KEY_V2,
    //         'response': token,
    //         'remoteip': remoteIp,
    //     }
    // })
    //     .then(res => {
    //         console.log(res);
    //         const { success } = res.data;
    //         if (success) {
    //             console.log("confirm order");
    //         } else {
    //             M.toast({ html: 'Please complete the captcha' })
    //         }
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     })
    //     .finally(() => {
    //         captchaRef.current.reset();
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
    //         captchaRef.current.reset();
    //         console.log(e);
    //     })
    //     .finally(() => {
    //         captchaRef.current.reset();
    //     })
  };
  const confirmOrder = () => {
    const data = { address_id: addressId };
    axios
      .post('/api/orders/confirm', data, {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {
        setMsg(res.data.msg);
        setAuth({ ...auth, credits: res.data.new_credits });
        updateLocalStorage({ ...auth, credits: res.data.new_credits });
      })
      .catch((err) => {

        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      })
      .finally(() => {
        redirectUser();
      });
  };
  const redirectUser = () => {
    setTimeout(() => {
      if (auth?.token) {
        <Redirect to='/shopping/orders' />;
      } else {
        <Redirect to='/shopping/home' />;
      }
    }, 10000);
  };
  return (
    <div className='container'>
      {!msg ? (
        <>
          <div className='row' style={{ padding: '30px' }}>
            <div className='col s10 l6 m8 offset-l4 offset-s1 offset-m2'>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_reCAPTCHA_KEY_V2}
                onChange={(token) => setToken(token)}
                ref={captchaRef}
                type='image'
                theme='dark'
                badge='inline'
                size='normal'
              />
              {/* <HCaptcha
                                    sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
                                    onVerify={token => setToken(token)}
                                    ref={hcaptchaRef}

                                /> */}
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <div className='input-field'>
                <button
                  disabled={msg && msg.length > 0}
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirmation();
                  }}
                  className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                >
                  Confirm
                  <i className='material-icons right'>check_circle</i>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
          <div
            className='row'
            style={{ marginTop: '25px', marginBottom: '25px' }}
          >
            <div className='col s12'>{msg && <h4>{msg}</h4>}</div>
            <div className='col s12 '>
              <img
                src={successOrder}
                alt='successOrder'
                style={{ height: '300px', marginTop: '40px' }}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default CaptchaPage;
