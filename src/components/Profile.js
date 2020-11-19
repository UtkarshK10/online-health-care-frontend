import React, { useState } from 'react';
import ImageAvatar from './ImageAvatar';
import '../styles/UserRegistrationStyles.css';
import CustomG from './CustomG';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  let classD = 'remove';
  const updatetrigger = () => {
    setEdit(!edit);
  };
  const updateGender = (val) => {
    if (edit) setUser({ ...user, gender: val });
  };

  if (edit === true) {
    classD = 'shadow ';
  }

  const [user, setUser] = useState({
    imageURL: 'https://static.toiimg.com/photo/72975551.cms',
    name: 'Prakhar',
    username: 'prakharkamal',
    email: 'prakhar@gmail.com',
    age: '21',
    phoneno: '9919318905',
    gender: 'female',
  });
  const { imageURL, name, username, email, age, phoneno, gender } = user;
  const update = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m4 l4 margin'>
            <ImageAvatar imageURL={imageURL} name={name} />
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
                  <label htmlFor='name'>Name</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <input
                    value={phoneno}
                    onChange={update}
                    type='text'
                    id='phoneno'
                    name='phoneno'
                    readOnly={!edit}
                    className='validate'
                  />
                  <label htmlFor='pho'>Phone no</label>
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
                  <label htmlFor='age'>Age</label>
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
