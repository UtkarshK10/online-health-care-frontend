import React from 'react'
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
const Orders = [
    { "id": "1", name: "Strepsils Lozenges Orange", "price": "285", "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1915&q=80", "quantity": 2 },
    { "id": "2", name: "Strepsils Lozenges Orange", "price": "500", "image_url": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80", "quantity": 1 },
    { "id": "3", name: "Strepsils Lozenges Orange", "price": "700", "image_url": "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80", "quantity": 3 },
]
const OrderDetails = (props) => {
    const searchString = queryString.parse(props.location.search);
    const history = useHistory();
    const downloadInvoice = () => {
        //invoice download
    }
    const handleClick = e => {
        e.preventDefault();
        history.push('/shopping/orders');
    }
    return (
        <div className='container'>
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <div className='row'>
                        <div className='col s12 m6 l6'>
                            <h4 className='left-align'>Order #{searchString.id} Details</h4>
                        </div>
                        <div className="col s12 m3 l3 offset-m3 offset-l3">
                            <button className='btn btn-large pcolour btn-register waves-effect waves-light hover' onClick={downloadInvoice}>
                                Invoice
                        <i className='material-icons left'>get_app</i>
                            </button>
                        </div>
                    </div>

                </li>
                {Orders.map((orderDetail, idx) => (<React.Fragment key={orderDetail.id}>
                    <li className='row' >
                        <div className="col s12 m2 l2">
                            <img
                                src={orderDetail?.image_url}
                                alt={orderDetail.name}
                                style={{ height: '150px', width: '150px', padding: '20px', paddingRight: '0px' }}
                                className='newsImage avatar col s12 m4 l4'
                            />
                        </div>
                        <div className='col s12 m4 l4'>
                            <p style={{ fontSize: '1.8em', marginLeft: '0px' }}>
                                {orderDetail.name} <br />

                            </p>
                        </div>
                        <div className='col s6 m2 l2 offset-m4 offset-l4'>
                            <p
                                className='ptcolour'
                                style={{ fontSize: '2.5em', margin: '5px', fontWeight: '400', display: 'flex', marginLeft: '22px' }}
                            >
                                &#8377; {orderDetail.price}
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>

                                <button onClick={e => {
                                    e.preventDefault();
                                }} className='btn btn-small scolour waves-effect'><span style={{ fontSize: '20px' }}>{orderDetail.quantity} Items</span> </button>

                            </div>

                        </div>
                    </li><div className='divider'></div>
                </React.Fragment>

                ))}
            </ul>
            <div className='row'>

                <div className='input-field'>
                    <button className='btn btn-large pcolour btn-register waves-effect waves-light hover' onClick={handleClick}>
                        Go Back
                        <i className='material-icons left'>arrow_back</i>
                    </button>
                </div>
            </div>
        </div >

    )
}

export default OrderDetails
