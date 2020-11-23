import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosC from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import PatientCountCard from '../PatientCountCard';
import RedHeart from '../../assets/heart-red.png';
import BlueHeart from '../../assets/heart-blue.png';
import GreenHeart from '../../assets/heart-green.png';

export default function DoctorHomePage() {
  const [newsPosts, setNewsPosts] = useState([]);
  const { auth } = useContext(AuthContext);
  const [searchItem, setSearchItem] = useState('Covid');
  const [patientCount, setCount] = useState({});
  const NEWS_API_KEY = process.env.REACT_APP_NEWS_API;
  const iconNames = [GreenHeart, RedHeart, BlueHeart];
  useEffect(() => {
    let cancel;
    const fetchNews = () => {
      axios
        .get('https://newsapi.org/v2/top-headlines', {
          params: {
            q: searchItem,
            language: 'en',
            pageSize: 5,
            page: 1,
            apiKey: NEWS_API_KEY,
          },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          console.log(res.data.articles);
          setNewsPosts(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
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
          console.log(res);
          setCount({ ...res?.data });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchPatientCount();
  }, [auth.token]);

  const shortDescription = (description) => {
    const maxChar = 200;
    if (description.length > maxChar) {
      description = description.substring(0, maxChar) + ' . . .';
      return description;
    }
  };
  return (
    <div className='container'>
      <div className='row '>
        {Object.keys(patientCount).map((keyname, idx) => {
          return (
            <div
              className={`col s12 m2 l3  ${
                idx === 0 ? 'left-marg' : 'offset-l1'
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
        <input
          type='text'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='ptcolour'>News Articles related to {searchItem}</h4>
        </li>
        {newsPosts.map((article, idx) => (
          <li key={idx} className='collection-item'>
            <div className='row'>
              <img
                src={article?.urlToImage}
                alt={article.title}
                className='newsImage col s12 m4 l4'
              />
              <div className='col s12 m8 l8 '>
                <span className='title stcolour font-app'>{article.title}</span>
                <p className='grey-text'>
                  {shortDescription(article.description)}
                </p>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`${article.url}#!`}
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
