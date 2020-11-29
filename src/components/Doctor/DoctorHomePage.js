import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosC from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import PatientCountCard from './PatientCountCard';
import M from 'materialize-css/dist/js/materialize.min.js';
import RedHeart from '../../assets/heart-red.png';
import BlueHeart from '../../assets/heart-blue.png';
import GreenHeart from '../../assets/heart-green.png';

export default function DoctorHomePage() {
  const STATIC_URL = 'https://static01.nyt.com/'
  const [newsPosts, setNewsPosts] = useState([]);
  const { auth } = useContext(AuthContext);
  const [searchItem] = useState('Covid');
  const [patientCount, setCount] = useState({});
  const NEWS_API_KEY = process.env.REACT_APP_NEWS_API;
  const iconNames = [GreenHeart, RedHeart, BlueHeart];
  useEffect(() => {
    let cancel;
    const fetchNews = () => {
      // axios
      //   .get('https://newsapi.org/v2/top-headlines', {
      //     params: {
      //       q: searchItem,
      //       language: 'en',
      //       pageSize: 10,
      //       page: 1,
      //       apiKey: NEWS_API_KEY,
      //     },
      //     cancelToken: new axios.CancelToken((c) => (cancel = c)),
      //   })
      //   .then((res) => {
      //     setNewsPosts(res.data.articles);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
        params: {
          q: searchItem,
          'api-key': process.env.REACT_APP_NYT_KEY
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then(res => {
          setNewsPosts(res.data.response.docs)
        })
        .catch(err => {
          console.log(err);
        })
    };
    fetchNews();
    return () => cancel();
  }, [NEWS_API_KEY, searchItem]);

  useEffect(() => {
    const fetchPatientCount = () => {
      axiosC
        .get('/api/doctors/patient_count', {
          headers: {
            'dapi-token': auth.token,
          },
        })
        .then((res) => {
          setCount({ ...res?.data });
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
    if (auth?.token) fetchPatientCount();
  }, [auth?.token]);

  const shortDescription = (description) => {
    const maxChar = 200;
    if (description?.length > maxChar) {
      description = description?.substring(0, maxChar) + ' . . .';
      return description;
    }
    return description;
  };
  return (
    <div className='container'>
      <div className='row' style={{ marginTop: '10px' }}>
        {Object.keys(patientCount).map((keyname, idx) => {
          return (
            <div
              className={`col s12 m3 l3  ${idx === 0 ? 'left-marg' : 'offset-l1 offset-m1'
                }`}
              key={idx}
            >
              <PatientCountCard
                title={keyname}
                count={patientCount[keyname]}
                icon={iconNames[idx]}
              />
            </div>
          );
        })}
      </div>
      <div className='row'>
        {/* <input
          type='text'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        /> */}
      </div>

      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='ptcolour'>News Articles related to {searchItem}</h4>
        </li>
        {newsPosts.map((article, idx) => (
          <li key={idx} className='collection-item'>
            <div className='row'>
              <img
                src={STATIC_URL + article?.multimedia[0]?.url}
                alt={article?.headline?.main}
                className='newsImage col s12 m4 l4'
              />
              <div className='col s12 m8 l8 '>
                <span className='title stcolour font-app'>{article?.headline?.main}</span>
                <p className='grey-text'>
                  {shortDescription(article?.abstract)}
                </p>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`${article?.web_url}#!`}
                  className='secondary-content'
                >
                  <i className='material-icons blue-text ptcolour'>send</i>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
