import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function DoctorHomePage() {
    const [newsPosts, setNewsPosts] = useState([]);
    const [searchItem, setSearchItem] = useState('Covid');
    const NEWS_API_KEY = process.env.REACT_APP_NEWS_API
    useEffect(() => {
        let cancel;
        const fetchNews = () => {
            axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    q: searchItem,
                    language: 'en',
                    apiKey: NEWS_API_KEY
                },
                cancelToken: new axios.CancelToken(c => cancel = c)
            })
                .then(res => {
                    console.log(res.data.articles)
                    setNewsPosts(res.data.articles);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchNews();
        return () => cancel()
    }, [NEWS_API_KEY, searchItem]);
    const shortDescription = (description) => {
        const maxChar = 200
        if (description.length > maxChar) {
            description = description.substring(0, maxChar) + " . . ."
            return description;
        }
    }

    return (
        <div className="container">
            <input type="text" value={searchItem} onChange={e => setSearchItem(e.target.value)} />
            <ul className="collection with-header">
                <li className="collection-header"><h4>News Articles related to {searchItem}</h4></li>
                {newsPosts.map((article, idx) => (
                    <div key={idx} className="row">
                        <li className="collection-item">

                            <img src={article?.urlToImage} alt={article.title} style={{ height: "200px", width: "200px" }} className="avatar col s12 m4 l4" />
                            <span className="title ptcolour">{article.title}</span>
                            <p className="grey-text">{shortDescription(article.description)}</p>
                            <a target="_blank" rel="noreferrer" href={`${article.url}#!`} className="secondary-content">
                                <i className="material-icons blue-text">send</i>
                            </a>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

