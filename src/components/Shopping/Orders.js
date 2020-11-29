import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import noOrders from '../../assets/no-orders.png';
import ReactSpinner from '../ReactSpinner';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import M from 'materialize-css/dist/js/materialize.min.js';
// const OrderArray = [
//     { "id": "1", "order_time": "27/11/2020 18:23:31", "total_items": 3 },
//     { "id": "2", "order_time": "28/11/2020 18:43:20", "total_items": 4 },
// ]
const Orders = () => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { auth } = useContext(AuthContext);
    const handleClick = id => {
        history.push(`/shopping/orders/details?id=${id}`);
    }

    useEffect(() => {
        if (auth?.token) {
            setLoading(true);
            axios.get('/api/orders/orders', {
                headers: {
                    'api-token': auth?.token
                }
            })
                .then(res => {
                    setLoading(false);
                    setOrders(res.data.orders);
                })
                .catch(err => {
                    setLoading(false);
                    if (err?.response) {
                        M.toast({ html: err?.response?.data?.msg });
                    } else if (err?.request) {
                        M.toast({ html: err?.request?.data?.toString() });
                    } else {
                        M.toast({ html: 'Something went wrong, please try again' });
                    }
                })
        }
    }, [auth?.token])

    if (loading) {
        return <ReactSpinner size="50px" />
    }

    if (!loading && orders.length === 0) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col s12'> <h2>You don't have any orders to show!</h2>
                        <img src={noOrders} alt="No Orders" /></div>
                </div>

            </div>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <h3>Your Orders</h3>
            </div>
            <table className="striped responsive-table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Order Date</th>
                        <th>Total Items</th>
                        <th>View Details</th>
                    </tr></thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.order_date.toString().replace("GMT", "IST")}</td>
                            <td>{order.items_count}</td>
                            <td>

                                <button onClick={e => {
                                    e.preventDefault();
                                    handleClick(order.id);
                                }} className='btn btn-large pcolour btn-register waves-effect waves-light hover'>
                                    Details
                        <i className='material-icons right'>pageview</i>
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
        </div>
    )
}

export default Orders
