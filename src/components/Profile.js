import React, { useState, useContext, useEffect, useMemo } from 'react';
import ImageAvatar from './ImageAvatar';
import '../styles/UserRegistrationStyles.css';
import CustomG from './CustomG';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
import ToggleMode from './ToggleMode';

const Profile = ({ isDoctor }) => {
  const [edit, setEdit] = useState(false);
  const { auth } = useContext(AuthContext);
  const route = isDoctor ? '/api/doctors/me' : '/api/users/me';
  const headers = useMemo(
    () =>
      isDoctor ? { 'dapi-token': auth?.token } : { 'api-token': auth?.token },
    [auth?.token, isDoctor]
  );
  let classD = 'remove';
  const updatetrigger = () => {
    setEdit(!edit);
    if (edit) {
      axios
        .put(`${route}`, user, {
          headers: { ...headers, 'Content-type': 'application/json' },
        })
        .then((res) => {
          setUser({ ...res.data.user });
        })
        .catch((err) => {
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
  const updateGender = (val) => {
    if (edit) setUser({ ...user, gender: val });
  };

  const setImage = async (img) => {
    const formData = new FormData();
    formData.append('file', img);
    axios
      .put(`${route}`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        setUser({ ...res.data.user, profile_url: res.data.user.profile_url });
      })
      .catch((err) => {
        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      });
  };

  if (edit === true) {
    classD = 'shadow ';
  }
  const [user, setUser] = useState({
    name: '',
    username: '',
    profile_url: '',
    email: '',
    age: '',
    phone: '',
    gender: '',
    experience: '',
    consultation_fee: '',
  });
  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get(`${route}`, {
          headers,
        })
        .then((res) => {
          setUser({ ...res.data.user });
        })
        .catch((err) => {
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    };
    if (auth?.token) fetchUser();
  }, [auth?.token, route, headers]);

  const {
    profile_url,
    name,
    username,
    email,
    age,
    phone,
    gender,
    consultation_fee,
    experience,
  } = user;
  const update = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m4 l4 margin'>
            <ImageAvatar
              imageURL={profile_url}
              name={name}
              setImage={setImage}
            />
            <h4>{username}</h4>
            <h5>{email}</h5>
            {!edit && (
              <button
                className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                onClick={updatetrigger}
              >
                Edit profile
                <i className='material-icons right'>edit</i>
              </button>
            )}
            {edit && (
              <button
                className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                onClick={updatetrigger}
              >
                Update
                <i className='material-icons right'>save</i>
              </button>
            )}
            <label>
              <p style={{ fontSize: '20px' }}>Switch Theme</p>
              <ToggleMode />
            </label>
          </div>
          <div className='col s12 m7 l7 offset-l1 offset-m1'>
            <form onSubmit={update} className={`update-form  ${classD}`}>
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={name}
                    onChange={update}
                    type='text'
                    id='name'
                    name='name'
                    readOnly={!edit}
                    className='validate'
                  />
                  <label htmlFor='name' className={`${name && 'active'}`}>
                    Name
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={phone}
                    onChange={update}
                    type='text'
                    id='phoneno'
                    name='phone'
                    readOnly={!edit}
                    className='validate'
                  />
                  <label htmlFor='pho' className={`${phone && 'active'}`}>
                    Phone no
                  </label>
                </div>
              </div>
              {isDoctor ? (
                <>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={experience}
                        onChange={update}
                        name='experience'
                        id='experience'
                        type='text'
                        className='validate'
                        readOnly={!edit}
                        min='1'
                        max='100'
                      />
                      <label
                        htmlFor='experience'
                        className={`${experience && 'active'}`}
                      >
                        Experience (in years)
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={consultation_fee}
                        onChange={update}
                        name='consultation_fee'
                        id='consultation_fee'
                        type='number'
                        readOnly={!edit}
                        min={0}
                        max={2000}
                      />
                      <label
                        htmlFor='consultation_fee'
                        className={`${consultation_fee && 'active'}`}
                      >
                        Fee (in &#8377;)
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={age}
                        onChange={update}
                        name='age'
                        id='age'
                        type='number'
                        readOnly={!edit}
                        min='1'
                        max='100'
                      />
                      <label htmlFor='age' className={`${age && 'active'}`}>
                        Age
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col l3 m3 s6 offset-l3 offset-m3'>
                      <CustomG
                        sex='male'
                        gender={gender}
                        updateGender={updateGender}
                      />
                    </div>
                    <div className='col l3 m3 s6'>
                      <CustomG
                        sex='female'
                        gender={gender}
                        updateGender={updateGender}
                      />
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
