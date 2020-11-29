import React from 'react'
import notFound from '../assets/404.gif';

const Nf404 = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m6 l6">
                    <img src={notFound} alt="Not found" />
                </div>
            </div>
        </div>
    )
}

export default Nf404
