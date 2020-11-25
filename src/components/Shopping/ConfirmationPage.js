import React, { useState } from 'react'
import ReactSpinner from '../ReactSpinner';

const ConfirmationPage = () => {

    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    };

    const handleConfirmation = async (e) => {
        e.preventDefault();

        // const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        // const phoneno = /^\d{10}$/;
        // const regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // if (name === '') {
        //     M.toast({ html: 'Name cannot be empty' });
        // } 
    }

    return (
        <div className='container'>
            <div className="row">
                <h3>Address</h3>
            </div>
            <div className='row'>
                <div className='col s12 m8 l8 offset-l2 offset-m2'>
                    <div id=''>
                        <form className='padding-form shadow'>    <div className='row'>
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
                                </div></div>
                            <div className='col s12 m6 l6'>
                                <div className='input-field'>
                                    <input
                                        value={address.phoneNo}
                                        onChange={handleChange}
                                        id='phoneNo'
                                        type='text'
                                        name='phoneNo'
                                        className='validate'
                                    />
                                    <label htmlFor='phoneNo' className='font-app'>
                                        Phone Number
                      </label>
                                </div></div>


                        </div>
                            <div className='row'>
                                <div className='input-field'>
                                    <input
                                        value={address.houseNo}
                                        onChange={handleChange}
                                        id='houseNo'
                                        type='text'
                                        name='houseNo'
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
                                            value={address.zip}
                                            onChange={handleChange}
                                            id='zip'
                                            type='text'
                                            name='zip'
                                            className='validate'
                                        />
                                        <label htmlFor='zip' className='font-app'>
                                            Zip code
                      </label>
                                    </div></div>
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
                                        <label htmlFor='city' className='font-app'>
                                            City
                      </label>
                                    </div></div>


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
                                    <label htmlFor='state' className='font-app'>
                                        State
                      </label>
                                </div>
                            </div>
                        </form>
                        <div className='row'>
                            {!loading && (
                                <div className='input-field'>
                                    <button onClick={e => {
                                        e.preventDefault();
                                        handleConfirmation();
                                    }} className='btn btn-large pcolour btn-register waves-effect waves-light hover'>
                                        Confirm
                        <i className='material-icons right'>check_circle</i>
                                    </button>
                                </div>
                            )}
                            {loading && <ReactSpinner size={25} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPage
