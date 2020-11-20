import React, { useState, useContext, useEffect } from 'react';
import ImageAvatar from './ImageAvatar';
import '../styles/UserRegistrationStyles.css';
import CustomG from './CustomG';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import { updateLocalStorage } from '../utils/helper';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  let classD = 'remove';
  const updatetrigger = async () => {
    setEdit(!edit);
    if (edit) {
      delete user.id;
      delete user.created_at;
      delete user.modified_at;
      console.log(auth.token)
      try {
        const res = await axios.put('/api/users/me', user, {
          headers: {
            'Content-type': 'application/json',
            'api-token': auth.token,
          },
        });
        console.log(res);
        setUser(res.data.user);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const updateGender = (val) => {
    if (edit) setUser({ ...user, gender: val });
  };
  const setImage = async img => {
    const formData = new FormData();
    formData.append('file', img);
    try {
      console.log("inside");
      const res = await axios.put('/api/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'api-token': auth.token
        }
      })
      console.log(res);
      setUser({ ...res.data.user, profile_url: res.data.user.profile_url });
      await setAuth({ ...auth, profile_image: res.data.user.profile_url });
      await updateLocalStorage({ ...auth, profile_image: res.data.user.profile_url });
    } catch (e) {

    }
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
    gender: ''
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/me`, {
          headers: {
            'api-token': auth.token,
          },
        });
        setUser({ ...res.data.user });
      } catch (e) {
        console.log(e);
      }
    };
    if (auth.user_id)
      fetchUser();
  }, [auth.user_id, auth.token]);

  const { profile_url, name, username, email, age, phone, gender } = user;
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
                className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                onClick={updatetrigger}
              >
                Edit profile
                <i className='material-icons right'>edit</i>
              </button>
            )}
            {edit && (
              <button
                className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                onClick={updatetrigger}
              >
                Update
                <i className='material-icons right'>save</i>
              </button>
            )}
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
                  <label htmlFor='name' className="active">Name</label>
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
                  <label htmlFor='pho' className="active">Phone no</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={age}
                    onChange={update}
                    name='age'
                    id='age'
                    type='number'
                    className='validate'
                    readOnly={!edit}
                    min='1'
                    max='100'
                  />
                  <label htmlFor='age' className="active">Age</label>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
