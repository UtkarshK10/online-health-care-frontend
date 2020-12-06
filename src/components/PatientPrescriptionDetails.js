import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import ReactSpinner from './ReactSpinner';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import noPrescription from '../assets/no-prescription.png';
import M from 'materialize-css/dist/js/materialize.min.js';

const PatientPrescriptionDetails = (props) => {
  const searchString = queryString.parse(props.location.search);
  const { id } = searchString;
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  const addToCart = (e) => {
    e.preventDefault();
    axios
      .get(`/api/prescriptions/add/${id}`, {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {
        M.toast({ html: res.data.msg });
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
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/records');
  };

  useEffect(() => {
    if (auth?.token) {
      setLoading(true);
      axios
        .get(`/api/prescriptions/show/${id}`, {
          headers: {
            'api-token': auth?.token,
          },
        })
        .then((res) => {
          setLoading(false);
          setPrescriptionDetails(res.data.details);
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
  }, [auth?.token, id]);

  if (loading) {
    return (
      <div className='container'>
        <ReactSpinner size='50px' />
      </div>
    );
  }
  if (!loading && prescriptionDetails?.length === 0) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <h2>No prescription has been issued yet!</h2>
            <img
              src={noPrescription}
              alt='no-prescription'
              style={{ width: '300px' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container' style={{ paddingTop: '30px' }}>
      <ul className='collection with-header' style={{ marginTop: '0px' }}>
        <li className='collection-header bgcolor'>
          <div className='row'>
            <div className='col s12 m6 l6'>
              <h4 className='left-align'>Prescription #{searchString.id}</h4>
            </div>
            <div className='col s12 m3 l3 offset-m3 offset-l3'>
              <button
                className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                onClick={addToCart}
              >
                <i className='material-icons' style={{ fontSize: '2.5em' }}>
                  add_shopping_cart
                </i>
              </button>
            </div>
          </div>
        </li>
        {prescriptionDetails.map((prescriptionDetail, idx) => (
          <React.Fragment key={idx}>
            <li className='row'>
              <div className='col s12 m3 l3'>
                <img
                  src={prescriptionDetail?.image_url}
                  alt={prescriptionDetail.name}
                  style={{
                    height: '150px',
                    width: '150px',
                    padding: '20px',
                    paddingRight: '0px',
                  }}
                  className='newsImage avatar'
                />
              </div>
              <div className='col s12 m5 l4'>
                <p style={{ fontSize: '1.8em', marginLeft: '0px' }}>
                  {prescriptionDetail.Name} <br />
                  <span className='grey-text' style={{ fontSize: '0.8em' }}>
                    {prescriptionDetail.description}
                  </span>
                </p>
              </div>
              <div
                className='col s6 m4 l3  offset-l2'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p
                  className='ptcolour'
                  style={{
                    fontSize: '2.5em',
                    margin: '5px',
                    fontWeight: '400',
                    display: 'flex',
                    marginLeft: '22px',
                  }}
                >
                  {prescriptionDetail.price} cr.
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className='btn btn-small black waves-effect'
                >
                  <span style={{ fontSize: '20px' }}>
                    {prescriptionDetail.quantity}{' '}
                    {prescriptionDetail.quantity === 1 ? ' unit' : ' units'}
                  </span>{' '}
                </button>
              </div>
            </li>
            <div className='divider'></div>
          </React.Fragment>
        ))}
      </ul>
      <div className='row'>
        <div className='input-field'>
          <button
            className='btn btn-large pcolour btn-register waves-effect waves-light hover'
            onClick={handleClick}
          >
            Go Back
            <i className='material-icons left'>arrow_back</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescriptionDetails;
