import React, { useState, useContext } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import ReactSpinner from './ReactSpinner';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import queryString from 'query-string';
import { updateLocalStorage } from '../utils/helper';
import M from 'materialize-css/dist/js/materialize.min.js';
import GetWell from '../assets/get-well.jpg';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

const Oxymeter = (props) => {
  const { title, appointment } = props;
  const [oxylevel, setLevel] = useState({});
  const [text, setText] = useState('Watch Demo!');
  const [switchView, setSwitchView] = useState(false);

  const [data, setData] = useState({
    temperature: '',
    contact: '',
    difficulty: '',
    travel: '',
  });
  const [checkboxData, setCheckboxData] = useState({
    symptoms: [],
    disease: [],
    apply: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [msg, setMsg] = useState(null);
  const handleFileChange = async (file) => {
    if (file.length > 0) {
      const formData = new FormData();
      formData.append('file', file[0]);
      setLoading(true);
      axios
        .post('/api/users/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'api-token': auth.token,
          },
        })
        .then((res) => {
          setLevel(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            console.log('exc', err?.request);
            M.toast({
              html:
                'Your internet speed might be causing the problem to get the response, try with a good internet speed or may be some server side issue',
            });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const symptoms = [
    { name: 'symptoms', label: 'Cold', value: 'Cold' },
    { name: 'symptoms', label: 'Cough', value: 'Cough' },
    { name: 'symptoms', label: 'Fever', value: 'Fever' },
    { name: 'symptoms', label: 'Headache', value: 'Headache' },
  ];
  const disease = [
    { name: 'disease', label: 'Diabetes', value: 'Diabetes' },
    { name: 'disease', label: 'Hypertension', value: 'Hypertension' },
    { name: 'disease', label: 'Lung Disease', value: 'Lung Disease' },
    { name: 'disease', label: 'Headache', value: 'Heart Disease' },
    { name: 'disease', label: 'None of the above', value: 'none' },
  ];
  const apply = [
    {
      name: 'apply',
      label:
        'I have recently interacted or lived with someone who has tested positive for COVID - 19',
      value: '0',
    },
    {
      name: 'apply',
      label:
        'I am a healthcare worker and I examined a COVID-19 confirmed case without protective gear',
      value: '1',
    },
    { name: 'apply', label: 'No Interaction', value: '2' },
  ];

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    const value = e.target.value;
    const toFilter = checkboxData[name];
    // console.log(toFilter);
    let filtered;
    if (!isChecked) {
      filtered = toFilter.filter((ele) => {
        return ele !== value;
      });
    } else {
      filtered = [...toFilter, value];
    }
    setCheckboxData({ ...checkboxData, [name]: [...filtered] });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setSwitchView(!switchView);
    setText(text === 'Go back' ? 'Watch Demo' : 'Go back');
  };
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = (e) => {
    e.target.pauseVideo();
  };

  if (!showForm) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 m12 l12'>
            <h3>{title}</h3>
            <p className='right-align'>
              {!loading && (
                <Link
                  to='#'
                  onClick={handleClick}
                  className='text-secondary highlight'
                >
                  {text}
                </Link>
              )}
            </p>
            {!loading && !switchView && (
              <DropzoneArea
                onChange={handleFileChange}
                acceptedFiles={[
                  'video/mp4',
                  'video/mkv',
                  'video/m4v',
                  'video/wav',
                ]}
                maxFileSize={16777216}
                filesLimit={1}
              />
            )}
            {!loading && switchView && (
              <div className='youtube'>
                <YouTube videoId='svb4Uku2KZ8' opts={opts} onReady={_onReady} />
              </div>
            )}
            {loading && <ReactSpinner size={150} />}
            {oxylevel?.spo2 > 0 && (
              <>
                <h4>
                  Your blood oxygen level is{' '}
                  <span className='highlight'>{+oxylevel.spo2.toFixed(2)}</span>
                </h4>
                <h4>
                  Your heart rate is{' '}
                  <span className='highlight'>
                    {+oxylevel.heart_rate.toFixed(2)}
                  </span>
                </h4>
              </>
            )}
            {oxylevel?.spo2 > 0 && appointment && (
              <a
                href='#!'
                onClick={(e) => {
                  e.preventDefault();
                  setShowForm(true);
                }}
                className='scolour waves-effect btn secondary-content center'
              >
                Continue
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  const bookAppointment = (e) => {
    e.preventDefault();
    setLoading(true);
    const otherCheckboxData = {};
    for (let key in checkboxData) {
      if (checkboxData[key].includes('none') && checkboxData[key].length > 1) {
        const idx = checkboxData[key].indexOf('none');
        if (idx > -1) checkboxData[key].splice(idx, 1);
      }
      otherCheckboxData[key] = checkboxData[key].join(', ');
    }
    const searchString = queryString.parse(props.location.search);
    const doctor_id = searchString.id;
    const jsonData = {
      ...data,
      ...otherCheckboxData,
      oxy_level: oxylevel?.spo2,
      heart_rate: oxylevel?.heart_rate,
      user_id: auth.user_id,
      doctor_id,
    };
    axios
      .post('/api/records/', jsonData, {
        headers: {
          'Content-type': 'application/json',
          'api-token': auth.token,
        },
      })
      .then((res) => {
        setLoading(false);

        if (res.status === 201) {
          const { new_credits } = res.data;
          setAuth({ ...auth, credits: new_credits });
          updateLocalStorage({ ...auth, credits: new_credits });
          setMsg(res.data.msg);
        }
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
  };

  if (showForm && !msg) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 l8 offset-l2 offset-m2'>
            <div id=''>
              <form
                onSubmit={bookAppointment}
                className='padding-form glow'
                autoComplete='off'
              >
                <div className='row'>
                  <div className='input-field'>
                    <input
                      value={data.temperature}
                      onChange={handleChange}
                      id='temperature'
                      type='text'
                      name='temperature'
                      className='validate'
                    />
                    <label htmlFor='temperature' className='font-app'>
                      Body Temperature
                    </label>
                  </div>
                  <div className='row'>
                    <p className='font-app'>
                      Were you in contact with person who had Cold/Fever/Covid?
                    </p>
                    <RadioButton
                      name='contact'
                      val1='Yes'
                      val2='No'
                      handleChange={handleChange}
                      curr={data['contact']}
                    />
                  </div>
                  <div className='row'>
                    <p className='font-app'>
                      Are you having difficulties in breathing?
                    </p>
                    <RadioButton
                      name='difficulty'
                      val1='Yes'
                      val2='No'
                      handleChange={handleChange}
                      curr={data['difficulty']}
                    />
                  </div>
                  <div className='row'>
                    <p className='font-app'>
                      Have you travelled anywhere internationally?
                    </p>
                    <RadioButton
                      name='travel'
                      val1='Yes'
                      val2='No'
                      handleChange={handleChange}
                      curr={data['travel']}
                    />
                  </div>
                  <div className='row'>
                    <Checkbox
                      title='Are you having any of the following symptoms?'
                      data={symptoms}
                      handleChange={handleCheckboxChange}
                      curr={checkboxData['symptoms']}
                    />
                  </div>
                  <div className='row'>
                    <Checkbox
                      title='Have you ever had or have any one of the following diseases?'
                      data={disease}
                      handleChange={handleCheckboxChange}
                      curr={checkboxData['disease']}
                    />
                  </div>
                  <div className='row'>
                    <Checkbox
                      title='Which of the following applies to you??'
                      data={apply}
                      handleChange={handleCheckboxChange}
                      curr={checkboxData['apply']}
                    />
                  </div>
                  <div className='row'>
                    {!loading && (
                      <div className='input-field'>
                        <button className='btn btn-large pcolour waves-effect waves-dark hover glow'>
                          Submit
                          <i className='material-icons right'>check_circle</i>
                        </button>
                      </div>
                    )}
                    {loading && <ReactSpinner size={25} />}
                  </div>
                </div>
              </form>{' '}
              <a
                href='#!'
                onClick={(e) => {
                  e.preventDefault();
                  setShowForm(false);
                }}
                style={{ marginBottom: '10px' }}
                className='pcolour waves-effect btn secondary-content'
              >
                <i className='material-icons left'>arrow_back</i>
                Go Back
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12'>{msg && <h4>{msg}</h4>}</div>{' '}
        <div className='col s8 l8 m8 offset-l2 offset-m2 offset-s2'>
          <img
            src={GetWell}
            alt='Get Well Soon'
            style={{ height: '500px', margin: '20px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Oxymeter;
