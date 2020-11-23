import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorHomePage() {
    const [newsPosts, setNewsPosts] = useState([]);
    const [searchItem, setSearchItem] = useState('Covid');
    const NEWS_API_KEY = process.env.REACT_APP_NEWS_API;
    useEffect(() => {
        let cancel;
        const fetchNews = () => {
            axios
                .get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        q: searchItem,
                        language: 'en',
                        apiKey: NEWS_API_KEY,
                        pageSize: 5,
                        page: 1
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
    const shortDescription = (description) => {
        const maxChar = 200;
        if (description.length > maxChar) {
            description = description.substring(0, maxChar) + ' . . .';
            return description;
        }
    };

    return (
        <div className='container'>
            <input
                type='text'
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
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