import React, { useState, useContext, useEffect } from 'react';
import ReactSpinner from '../ReactSpinner';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';

// const AddressArray = [
//     { "id": "1", "name": "User 1", "phone_number": "1234567890", "house_number": "B-102", "street": "Xyz Nagar", "zip_code": "100001", "city": "Random", "state": "Random" },
//     { "id": "2", "name": "User 2", "phone_number": "1234567890", "house_number": "B-102", "street": "Xyz Nagar", "zip_code": "100001", "city": "Random", "state": "Random" },
//     { "id": "3", "name": "User 3", "phone_number": "1234567890", "house_number": "B-102", "street": "Xyz Nagar", "zip_code": "100001", "city": "Random", "state": "Random" },
// ]

const ConfirmationPage = () => {
  const [address, setAddress] = useState({
    name: '',
    phone_number: '',
    house_number: '',
    street: '',
    landmark: '',
    zip_code: '',
    city: '',
    state: '',
  });
  const [newAddress, setNewAddress] = useState(false);
  const [oldAddresses, setOldAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const ALLOWED_ADDRESSES = 3;
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewAddress = () => {
    axios
      .get('/api/address/address_count', {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {
        const { address_count } = res.data;
        address_count === ALLOWED_ADDRESSES
          ? M.toast({
              html: 'Address limit reached, please delete some to add new!',
            })
          : setNewAddress(true);
      })
      .catch((e) => {});
  };

  const handleClick = (new_address, id = null) => {
    if (!new_address) {
      setLoading(true);
      const data = { id, new_address };
      axios
        .post('/api/address/', data, {
          headers: {
            'api-token': auth?.token,
          },
        })
        .then((res) => {
          const { address } = res.data;
          setLoading(false);
          history.push(`/shopping/confirm/${address}`);
        })
        .catch((err) => {
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.data?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
      return;
    }
    const {
      name,
      phone_number,
      house_number,
      street,
      landmark,
      zip_code,
      city,
      state,
    } = address;

    const regularExpressionZip = /^[1-9][0-9]{5}$/;
    const regularExpressionPhone = /^\d{10}$/;
    if (name === '') {
      M.toast({ html: 'Name cannot be empty' });
    } else if (!regularExpressionPhone.test(phone_number)) {
      M.toast({ html: 'Please enter a valid phone number' });
    } else if (house_number.length < 3) {
      M.toast({ html: 'House number should be atleast 3 characters long' });
    } else if (street.length < 5) {
      M.toast({ html: 'Street should be at least 5 characters long' });
    } else if (!regularExpressionZip.test(zip_code)) {
      M.toast({ html: 'Please enter a valid zip code' });
    } else if (city.length < 3) {
      M.toast({ html: 'City should be at least 3 characters long' });
    } else if (state.length < 5) {
      M.toast({ html: 'State should be at least 3 characters long' });
    } else {
      const data = {
        name,
        phone_number,
        house_number,
        street,
        landmark,
        zip_code,
        city,
        state,
        new_address,
      };
      setLoading(true);
      axios
        .post('/api/address/', data, {
          headers: {
            'api-token': auth?.token,
            'Content-type': 'application/json',
          },
        })
        .then((res) => {
          const { address } = res.data;
          setLoading(false);
          history.push(`/shopping/confirm/${address}`);
        })
        .catch((err) => {
          setLoading(false);
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.data?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    }
  };

  const prePopulate = () => {
    const { zip_code } = address;
    if (zip_code.length === 6) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://www.postalpincode.in/api/pincode/${zip_code}`
        )
        .then((res) => {
          const data = res.data.PostOffice[0];
          setAddress({
            ...address,
            state: data['State'],
            city: data['District'],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const deleteAddress = (id) => {
    if (loading) return;

    axios
      .delete('/api/address/delete_address', {
        headers: {
          'api-token': auth?.token,
        },
        data: { address_id: id },
      })
      .then((res) => {
        if (res.status === 200) {
          deleteLocally(id);
        }
      })
      .catch((err) => {
        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.data?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      });
  };

  const deleteLocally = (id) => {
    const temp_address = oldAddresses.filter((address) => address.id !== id);
    setOldAddresses(temp_address);
  };

  useEffect(() => {
    if (auth?.token) {
      axios
        .get('/api/address/all', {
          headers: {
            'api-token': auth?.token,
          },
        })
        .then((res) => {
          setOldAddresses(res.data.addresses);
        })
        .catch((err) => {
          if (err?.response) {
            M.toast({ html: err?.response?.data?.msg });
          } else if (err?.request) {
            M.toast({ html: err?.request?.data?.toString() });
          } else {
            M.toast({ html: 'Something went wrong, please try again' });
          }
        });
    }
  }, [auth?.token]);

  return (
    <div className='container'>
      {!newAddress && oldAddresses?.length > 0 && (
        <div className='row'>
          <div className='col s12'>
            {/*  */}
            <div className='card  bgsecondary'>
              <div className='card-content'>
                <h4>You can choose one from your existing addesses!</h4>
              </div>
              <div className='card-tabs'>
                <ul className='tabs tabs-fixed-width'>
                  {oldAddresses.map((address, idx) => {
                    return (
                      <li className='tab' key={address.id}>
                        <a className='pcolour' href={`#${address.id}`}>
                          <h6 style={{ color: 'white' }}>Address #{idx + 1}</h6>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className='card-content grey lighten-3'
                style={{ color: 'black' }}
              >
                {oldAddresses.map((address) => {
                  return (
                    <div
                      className='row'
                      id={`${address.id}`}
                      style={{ fontSize: '1.2em' }}
                    >
                      <div
                        className='col s12 m6 l6'
                        style={{ fontSize: '1.2em' }}
                      >
                        <span className='card-title'>
                          <em>{address.name}</em>
                          <h6>{address.phone_number}</h6>
                        </span>
                        <p> {address.house_number}</p>
                        <p>
                          {address.street} - {address.zip_code}
                        </p>
                        <p>
                          {address.city}, {address.state}
                        </p>
                      </div>
                      <div className='col s12 m3 l3 offset-m3 offset-l3'>
                        <div className='input-field'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick(false, address.id);
                            }}
                            className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                          >
                            Continue
                            <i className='material-icons right'>
                              arrow_forward
                            </i>
                          </button>
                        </div>
                      </div>
                      <div className='col s12 m3 l3 offset-m9 offset-l9'>
                        <div className='input-field'>
                          <i
                            onClick={() => deleteAddress(address.id)}
                            className='material-icons black-text'
                            style={{ cursor: 'pointer', fontSize: '30px' }}
                          >
                            delete
                          </i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      )}
      {newAddress ? (
        <div className='container'>
          {/* <div className='row'>
              <h3 className='h4-style'>New Address</h3>
            </div> */}
          <div className='row'>
            <div className='col s12 m12 l12'>
              <div id=''>
                <form className='padding-form shadow' autoComplete='off'>
                  {' '}
                  <div className='row'>
                    <div className='col s12 m6 l6'>
                      <div className='input-field'>
                        <input
                          value={address.name}
                          onChange={handleChange}
                          id='name'
                          type='text'
                          name='name'
                          className='validate'
                        />
                        <label htmlFor='name' className='font-app'>
                          Name
                        </label>
                      </div>
                    </div>
                    <div className='col s12 m6 l6'>
                      <div className='input-field'>
                        <input
                          value={address.phone_number}
                          onChange={handleChange}
                          id='phoneNo'
                          type='text'
                          name='phone_number'
                          className='validate'
                        />
                        <label htmlFor='phoneNo' className='font-app'>
                          Phone Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={address.house_number}
                        onChange={handleChange}
                        id='houseNo'
                        type='text'
                        name='house_number'
                        className='validate'
                      />
                      <label htmlFor='houseNo' className='font-app'>
                        House Number
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={address.street}
                        onChange={handleChange}
                        id='street'
                        type='text'
                        name='street'
                        className='validate'
                      />
                      <label htmlFor='street' className='font-app'>
                        Street
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={address.landmark}
                        onChange={handleChange}
                        id='landmark'
                        type='text'
                        name='landmark'
                        className='validate'
                      />
                      <label htmlFor='landmark' className='font-app'>
                        Landmark
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col s12 m6 l6'>
                      <div className='input-field'>
                        <input
                          onKeyUp={(e) => {
                            e.preventDefault();
                            prePopulate();
                          }}
                          value={address.zip_code}
                          onChange={handleChange}
                          id='zip'
                          type='text'
                          name='zip_code'
                          className='validate'
                        />
                        <label htmlFor='zip' className='font-app'>
                          Zip code
                        </label>
                      </div>
                    </div>
                    <div className='col s12 m6 l6'>
                      <div className='input-field'>
                        <input
                          value={address.city}
                          onChange={handleChange}
                          id='city'
                          type='text'
                          name='city'
                          className='validate'
                        />
                        <label
                          htmlFor='city'
                          className={`${address.city && 'active '}font-app`}
                        >
                          City
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='input-field'>
                      <input
                        value={address.state}
                        onChange={handleChange}
                        id='state'
                        type='text'
                        name='state'
                        className='validate'
                      />
                      <label
                        htmlFor='state'
                        className={`${address.state && 'active '}font-app`}
                      >
                        State
                      </label>
                    </div>
                  </div>
                </form>
                <div className='row'>
                  {!loading && (
                    <div className='row'>
                      <div className='col s6'>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setNewAddress(false);
                          }}
                          className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                        >
                          Go back
                          <i className='material-icons left'>arrow_back</i>
                        </button>
                      </div>
                      <div className='col s6'>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick(true);
                          }}
                          className='btn btn-large pcolour btn-register waves-effect waves-light glow'
                        >
                          Continue
                          <i className='material-icons right'>arrow_forward</i>
                        </button>
                      </div>
                    </div>
                  )}
                  {loading && <ReactSpinner size={25} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col s12'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNewAddress();
                }}
                className='btn btn-large pcolour btn-register waves-effect waves-light glow'
              >
                Add new address
                <i className='material-icons right'>create</i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
