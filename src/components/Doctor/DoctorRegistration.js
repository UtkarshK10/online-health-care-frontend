import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useInputState from '../../hooks/useInputState';
import '../../styles/UserRegistrationStyles.css';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import doctor from '../../assets/doctor_thanks.jpg';
import { useSpring, animated } from 'react-spring';
import ReactSpinner from '../ReactSpinner';
import DoctorOTPModal from '../../Modal/DoctorOTPModal';
import { saveLocalStorage } from '../../utils/helper.js';

function DoctorRegistration(props) {
  const [name, handleNameChange] = useInputState('');
  const [username, handleUserNameChange] = useInputState('');
  const [password, handlePasswordChange] = useInputState('');
  const [email, handleEmailChange] = useInputState('');
  const [phone, handlePhoneChange] = useInputState('');
  const [speciality, handleSpeciality] = useInputState('');
  const [experience, handleExperience] = useInputState('');
  const [fee, handleFee] = useInputState('');

  const [state] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const filePickerRef = useRef();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickedHandler = (event) => {
    let pickedFile;
    // let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      // fileIsValid = true;
    } else {
      setIsValid(false);
      // fileIsValid = false;
    }
  };

  //Modal part
  const getOTP = () => {
    var elem = document.querySelector('.dmodal');
    var instance = M.Modal.init(elem, { dismissible: false, opacity: 0.7 });
    instance.open();
  };
  useEffect(() => {
    if (openModal) getOTP();
    // eslint-disable-next-line
  }, [openModal]);

  //user signup and validation

  const register = async (e) => {
    e.preventDefault();
    const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const phoneno = /^\d{10}$/;
    const regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name === '') {
      return M.toast({ html: 'Name cannot be empty' });
    } else if (username === '') {
      return M.toast({ html: 'Username cannot be empty' });
    } else if (password.length < 6) {
      return M.toast({
        html: 'Password should be of minimum 6 characters.',
      });
    } else if (!regularExpressionPassword.test(password)) {
      return M.toast({
        html:
          'Password should contain atleast one number and one special character',
      });
    } else if (!regularExpressionEmail.test(email)) {
      return M.toast({ html: 'Please enter a valid email id.' });
    } else if (!phoneno.test(phone)) {
      return M.toast({ html: 'Please enter a valid phone number.' });
    } else if (experience === '') {
      return M.toast({ html: 'Please enter your experience.' });
    } else if (speciality === '' || speciality.length < 5) {
      return M.toast({
        html: 'Please enter about your speciality, minimum 5 characters',
      });
    } else if (fee === '' || (fee < 0 && fee > 2000)) {
      return M.toast({ html: 'Please enter a valid fee in the range of Rs 0-2000' });
    } else if (!file) {
      return M.toast({ html: 'Please pick an image' });
    } else if (!isValid) {
      return M.toast({
        html: 'Please pick one of the file format image: ".jpg,.png,.jpeg"',
      });
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('speciality', speciality);
      formData.append('experience', experience);
      formData.append('password', password);
      formData.append('file', file);
      formData.append('consultation_fee', fee);
      setLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      axios
        .post('/api/doctors/', formData, {
          headers: headers,
        })
        .then((res) => {

          //   const resData = {
          //     name: res.data.name,
          //     username: res.data.username,
          //     user_id: res.data.user_id,
          //     email: res.data.email,
          //     phone: res.data.phone,
          //     speciality: res.data.speciality,
          //     experience: res.data.experience,
          //     profile_image: res.data.profile_url,
          //     isLoggedIn: true,
          //     token: res.data.jwt_token,
          //     tokenExpirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
          //   };
          //   setAuth(resData);
          //   saveLocalStorage(resData);
          //   history.push('/doctors');
          const resData = {
            username: res.data.username,
          };
          setAuth(resData);
          saveLocalStorage(resData);
          setModal(true);
        })
        .catch((err) => {
          setLoading(false);
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

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1500 },
  });

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col hide-on-small-and-down m7 l7'>
            <div>
              <animated.div
                style={{
                  opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
                  transform: x
                    .interpolate({
                      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                      output: [0.6, 0.7, 0.8, 0.9, 1, 1.05, 1],
                    })
                    .interpolate((x) => `scale(${x})`),
                }}
              >
                <img
                  className='responsive-img center'
                  src={doctor}
                  alt='doctor'
                />
              </animated.div>
            </div>
          </div>
          <div className='col s12 m5 l5'>
            <div id='slide'>
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
                      value={fee}
                      onChange={handleFee}
                      id='fee'
                      type='number'
                      className='validate'
                    />
                    <label htmlFor='fee'>Fee</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={experience}
                      onChange={handleExperience}
                      id='experience'
                      type='text'
                      className='validate'
                    />
                    <label htmlFor='experience'>Experience (in years)</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <textarea
                      value={speciality}
                      onChange={handleSpeciality}
                      id='speciality'
                      className='materialize-textarea'
                      data-length='120'
                    ></textarea>
                    <label htmlFor='speciality'>Speciality</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='input-field'>
                    <input
                      type='file'
                      ref={filePickerRef}
                      style={{ display: 'none' }}
                      accept='.jpg,.png,.jpeg'
                      onChange={pickedHandler}
                    />
                    <div className={`image-upload`}>
                      <div className='image-upload__preview'>
                        {previewUrl && (
                          <img
                            width='100'
                            height='100'
                            src={previewUrl}
                            alt='Preview'
                          />
                        )}
                        {/* {!previewUrl && <p>Please pick an image.</p>} */}
                      </div>
                      <button
                        type='button'
                        onClick={pickImageHandler}
                        className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                      >
                        Upload Profile Picture
                        <i className='material-icons right'>image</i>
                      </button>
                    </div>
                    {/* {!isValid && <p>{''}</p>} */}
                  </div>
                </div>

                <div className='row'>
                  {!loading && (
                    <div className='input-field'>
                      <button className='btn btn-large pcolour btn-register waves-effect waves-light glow'>
                        Register
                        <i className='material-icons right'>check_circle</i>
                      </button>
                    </div>
                  )}
                  {loading && <ReactSpinner size={25} />}
                </div>
              </form>
              <span>
                Already registered?{' '}
                <Link to='/doctors/login' className='text-secondary'>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <DoctorOTPModal />
    </>
  );
}

export default DoctorRegistration;
