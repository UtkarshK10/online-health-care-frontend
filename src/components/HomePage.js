import React, { useState, useEffect, useContext } from 'react';
import axios from '../axios/axios';
import { AuthContext } from '../contexts/auth-context';
import ReactSpinner from './ReactSpinner';
import DoctorCard from './DoctorCard';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import Pagination from './Pagination';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import config from '../chatbot/config';
import MessageParser from '../chatbot/MessageParser';
import BotButton from './BotButton';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(3);
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  const fetchDoctors = () => {
    setLoading(true);
    axios
      .get('/api/doctors/', {
        headers: {
          // 'api-token': auth.token
        },
      })
      .then((res) => {
        setDoctors([...res.data]);
        setLoading(false);
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
  };
  useEffect(() => {
    // if (auth?.token)
    fetchDoctors();
    initModal();
  }, [auth?.token]);

  const initModal = () => {
    var elems = document.querySelectorAll('.bmodal');
    var instances = M.Modal.init(elems, { opacity: 0.1 });
  };

  const makeAppointment = (id) => {
    if (auth.credits < 10) {
      M.toast({
        html: "You don't have enough credits, please add and then continue",
      });
      return;
    }
    history.push(`/appointment/oxymeter?id=${id}`);
  };

  const idxOfLastDoctor = currentPage * doctorsPerPage;
  const idxOfFirstDoctor = idxOfLastDoctor - doctorsPerPage;
  const currPageDoctors = doctors.slice(idxOfFirstDoctor, idxOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <ReactSpinner size='50' />;
  }
  return (
    <>
      <div className='container'>
        <div className='row'>
          <h4 className='h4-style'>Our Health Experts</h4>
        </div>
        <div className='row'>
          {currPageDoctors.map((doctor) => {
            const { id, name, profile_url, experience, speciality } = doctor;
            return (
              <div key={doctor.id} className='col s12 m6 l4'>
                <DoctorCard
                  key={doctor.id}
                  id={id}
                  name={name}
                  photo={profile_url}
                  experience={experience}
                  speciality={speciality}
                  appointment={makeAppointment}
                  showLink={auth?.isLoggedIn}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        itemsPerPage={doctorsPerPage}
        totalItems={doctors.length}
        paginate={paginate}
      />
      <BotButton />
      <div id='chat-modal' className='modal bmodal'>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </>
  );
};

export default HomePage;
