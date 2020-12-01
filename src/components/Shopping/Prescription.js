import React, { useState, useContext } from 'react';
import ReactSpinner from '../ReactSpinner';
import EmptyPre from '../../assets/empty-pre.png';
import { AuthContext } from '../../contexts/auth-context';
import axios from '../../axios/axios';
import M from 'materialize-css/dist/js/materialize.min.js';

const Prescription = ({
  prescription,
  editPrescription,
  deletePrescription,
  editInstruction,
  recordID,
  resetPage,
}) => {
  const { auth } = useContext(AuthContext);
  const [loading_inc_dec, setLoadingIncDec] = useState(false);

  const handleDelete = (id) => {
    deletePrescription(id);
  };
  const handleEdit = async (id, qty) => {
    setLoadingIncDec(true);
    await editPrescription(id, qty);
    setLoadingIncDec(false);
  };

  const handleSubmit = () => {
    const data = prescription.map((p) => {
      const { id, quantity, instruction } = p;
      return { medicine_id: id, quantity, description: instruction };
    });

    axios
      .post(
        `/api/prescriptions/create/${recordID}`,
        { data },
        {
          headers: {
            'dapi-token': auth?.token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          resetPage();
          M.toast({ html: res.data.msg });
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

  const handleInstruction = (val, id) => {
    editInstruction(val, id);
  };

  return (
    <>
      <ul className='collection with-header ' style={{ marginTop: '0px' }}>
        <li className='collection-header bgcolor'>
          <div className='row hide-on-small-only'>
            <div className='col s12 m6 l6 offset-m3 offset-l3'>
              <h4 className='left-align'>Test's Prescription</h4>
            </div>
          </div>
          {/* <div className='row hide-on-med-and-up'>
            <div className='col s12 m6 l6'>
              <h4>Your Cart</h4>
              <h4>Total: &#8377; {total}</h4>
            </div>
          </div> */}
        </li>
        {prescription.map((prescriptionDetail, idx) => (
          <React.Fragment key={idx}>
            <li className='row'>
              <div className='col s12 m4 l4'>
                <p
                  style={{
                    fontSize: '1.5em',
                    marginLeft: '10px',
                    marginTop: '10px',
                    textAlign: 'left',
                  }}
                >
                  {prescriptionDetail.name} <br />
                  <span
                    className='text-secondary'
                    style={{ fontSize: '0.8em' }}
                  >
                    {prescriptionDetail.description}
                  </span>
                </p>
              </div>
              <div className='col s12 m3 l3  hide-on-small-only'>
                {loading_inc_dec ? (
                  <div style={{ marginRight: '118px', marginTop: '20px' }}>
                    <ReactSpinner size='30px' />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(prescriptionDetail.id, -1);
                      }}
                      className='material-icons text-primary'
                      style={{ cursor: 'pointer' }}
                    >
                      remove
                    </i>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className='btn btn-small scolour waves-effect'
                    >
                      <span style={{ fontSize: '18px' }}>
                        {prescriptionDetail.quantity}
                      </span>{' '}
                    </button>

                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(prescriptionDetail.id, 1);
                      }}
                      className='material-icons text-primary'
                      style={{ cursor: 'pointer' }}
                    >
                      add
                    </i>
                  </div>
                )}
              </div>
              <div className='row hide-on-med-and-up'>
                {loading_inc_dec ? (
                  <ReactSpinner size='25px' />
                ) : (
                  <div
                    className=' col s12'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '30%',
                    }}
                  >
                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(prescriptionDetail.medicine_id, -1);
                      }}
                      className='material-icons text-primary'
                      style={{ cursor: 'pointer' }}
                    >
                      remove
                    </i>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className='btn btn-small scolour waves-effect'
                    >
                      <span style={{ fontSize: '18px' }}>
                        {prescriptionDetail.quantity}
                      </span>{' '}
                    </button>

                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(prescriptionDetail.id, 1);
                      }}
                      className='material-icons text-primary'
                      style={{ cursor: 'pointer' }}
                    >
                      add
                    </i>
                  </div>
                )}
              </div>
              <div className='col s12 m3 l3'>
                <div className='row'>
                  <div className='col s10 offset-s1 l12'>
                    <div
                      className='input-field'
                      style={{ marginTop: '0px', paddingTop: '0px' }}
                    >
                      <input
                        type='text'
                        placeholder='instructions...'
                        value={prescription.instruction}
                        onChange={(e) =>
                          handleInstruction(
                            e.target.value,
                            prescriptionDetail.id
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className='col s12'></div>
                </div>
              </div>
              <div className='s12 m1 l1'>
                <button className='btn btn-small waves-effect waves-light hover pcolour'>
                  <i
                    className='material-icons '
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(prescriptionDetail.id);
                    }}
                  >
                    delete
                  </i>
                </button>
              </div>
            </li>
            <div className='divider'></div>
          </React.Fragment>
        ))}
        {prescription.length === 0 && (
          <img
            src={EmptyPre}
            className='col s8 offset-s2'
            style={{ paddingTop: '20px' }}
            alt='empty prescription'
          ></img>
        )}
      </ul>
      {prescription.length > 0 && (
        <div className='row'>
          <div className='input-field'>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              disabled={prescription?.length === 0}
              className='btn btn-large pcolour btn-register waves-effect waves-light glow'
            >
              Submit
              <i className='material-icons right'>add_task</i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Prescription;
