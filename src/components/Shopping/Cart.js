import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth-context';
import axios from '../../axios/axios';
import ReactSpinner from '../ReactSpinner';
import emptyCart from '../../assets/empty-cart.svg';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useHistory } from 'react-router-dom';


const Cart = () => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading_inc_dec, setLoadingIncDec] = useState(false);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        setTotal(
            cart.reduce((curr, item) => {
                let currVal = parseInt(item.quantity) * parseFloat(item.price)
                curr = +curr + parseFloat(currVal)
                return curr
            }, [0])
        )
    }, [cart])

    useEffect(() => {
        if (auth?.token) {
            setLoading(true);
            axios.get('/api/cart/', {
                headers: {
                    'api-token': auth?.token
                }
            })
                .then(res => {

                    setLoading(false);
                    setCart(res.data.details)
                })
                .catch(e => {
                    setLoading(false);
                    console.log(e);
                })
        }
    }, [auth?.token]);

    const handleDelete = id => {
        const data = { id };
        axios.delete('/api/cart/delete', {
            headers: {
                'api-token': auth?.token,
                'Content-type': 'application/json'
            },
            data: data
        })
            .then(res => {

                if (res.status === 200) {
                    const filteredProducts = cart.filter(item => item.id !== id);
                    setCart(filteredProducts)
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    const handleEdit = (medicine_id, qty, id) => {
        setLoadingIncDec(true);
        const data = {
            medicine_id,
            quantity: qty
        }
        axios.post('/api/cart/add_to', data, {
            headers: {
                'api-token': auth?.token,
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                setLoadingIncDec(false);
                if (res.status === 200) {

                    const newQuantity = res.data.data.quantity;
                    updateCart(id, newQuantity);
                }
            })
            .catch(e => {
                setLoadingIncDec(false);
                console.log(e)
            })

    }

    const updateCart = (id, qty) => {

        const editedCart = cart.map(item => {
            if (item.id === id) {
                const newItem = item;
                let oldQty = +item.quantity;
                oldQty = qty;
                newItem.quantity = oldQty;
                return newItem;
            }
            return item;
        })

        setCart(editedCart);
    }
    const checkCredit = () => {
        if (total / 4 < 200) {
            history.push('/shopping/confirm');
        }
        else {
            M.toast({ html: 'Not Enough credits' });
        }
    }


    if (loading) {
        return <ReactSpinner size="50px" />
    }
    if (cart && cart.length === 0 && !loading) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col s12'> <h2>Your Cart is Empty!</h2>
                        <img src={emptyCart} alt="Empty Cart" /></div>
                </div>


            </div>
        )
    }
    return (
        <div className='container'>
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <div className='row hide-on-small-only'>
                        <div className='col s12 m6 l6'>
                            <h4 className='left-align'>Your Cart</h4>
                        </div>
                        <div className='col s12 m6 l6'>
                            <h4 className='right-align'>Total: &#8377; {total}</h4>
                        </div>
                    </div><div className='row hide-on-med-and-up'>
                        <div className='col s12 m6 l6'>
                            <h4>Your Cart</h4>
                            <h4>Total: &#8377; {total}</h4>
                        </div>
                    </div>

                </li>
                {cart.map((cartDetail, idx) => (
                    <React.Fragment key={cartDetail.id}>
                        <li className='row'>
                            <div className="col s12 m2 l2 hide-on-small-only">
                                <img
                                    src={cartDetail?.image_url}
                                    alt={cartDetail.name}
                                    style={{ height: '150px', width: '150px', padding: '20px', paddingRight: '0px' }}
                                    className='newsImage avatar col s12 m4 l4'
                                />
                            </div><div className="col s12 m2 l2 hide-on-med-and-up">
                                <img
                                    src={cartDetail?.image_url}
                                    alt={cartDetail.name}
                                    style={{ padding: '20px' }}
                                    className='newsImage avatar col s12 m4 l4'
                                />
                            </div>
                            <div className='col s12 m3 l3'>
                                <p style={{ fontSize: '1.5em', marginLeft: '0px' }}>
                                    {cartDetail.medicine_name} <br />
                                    <span className="grey-text" style={{ fontSize: "0.8em" }}>{cartDetail.description}</span>
                                </p>
                            </div>
                            <div className='col s12 m2 l2  hide-on-small-only'>

                                <p
                                    className='ptcolour'
                                    style={{ fontSize: '2.2em', margin: '5px', fontWeight: '400', display: 'flex', marginLeft: '22px' }}
                                >
                                    &#8377; {cartDetail.price}
                                </p>
                                {loading_inc_dec ? <ReactSpinner size="25px" /> :
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <i onClick={(e) => {
                                            e.preventDefault();
                                            handleEdit(cartDetail.medicine_id, -1, cartDetail.id)
                                        }} className="material-icons ptcolour" style={{ cursor: "pointer" }}>remove</i>
                                        <button onClick={e => {
                                            e.preventDefault();
                                        }} className='btn btn-small scolour waves-effect'><span style={{ fontSize: '18px' }}>{cartDetail.quantity}</span> </button>

                                        <i onClick={(e) => {
                                            e.preventDefault();
                                            handleEdit(cartDetail.medicine_id, 1, cartDetail.id)
                                        }} className="material-icons ptcolour" style={{ cursor: "pointer" }}>add</i>
                                    </div>
                                }
                            </div>
                            <div className='row hide-on-med-and-up' >

                                {loading_inc_dec ? <ReactSpinner size="25px" /> :
                                    <div className=' col s6' style={{ display: 'flex', alignItems: 'center' }}>
                                        <i onClick={(e) => {
                                            e.preventDefault();
                                            handleEdit(cartDetail.medicine_id, -1, cartDetail.id)
                                        }} className="material-icons ptcolour" style={{ cursor: "pointer" }}>remove</i>
                                        <button onClick={e => {
                                            e.preventDefault();
                                        }} className='btn btn-small scolour waves-effect'><span style={{ fontSize: '18px' }}>{cartDetail.quantity}</span> </button>

                                        <i onClick={(e) => {
                                            e.preventDefault();
                                            handleEdit(cartDetail.medicine_id, 1, cartDetail.id)
                                        }} className="material-icons ptcolour" style={{ cursor: "pointer" }}>add</i>
                                    </div>
                                } <div className='col s6'>
                                    <p
                                        className='ptcolour  right-align'
                                        style={{ fontSize: '2.2em', margin: '5px', fontWeight: '400', marginLeft: '22px' }}
                                    >
                                        &#8377; {cartDetail.price}
                                    </p>
                                </div>
                            </div>


                            <div className='col s12 m3 l3 offset-l2 offset-m2'>
                                <button onClick={e => {
                                    e.preventDefault()
                                    handleDelete(cartDetail.id)
                                }} className='btn btn-medium pcolour btn-register waves-effect waves-light hover'>
                                    Remove from cart
                <i className='material-icons right'>delete</i>
                                </button>
                            </div>

                        </li><div className='divider'></div></React.Fragment>


                ))}
            </ul>
            <div className='row'>
                {!loading && (
                    <div className='input-field'>
                        <button className='btn btn-large pcolour btn-register waves-effect waves-light hover' onClick={checkCredit}>
                            Checkout
                        <i className='material-icons right'>check_circle</i>
                        </button>
                    </div>
                )}
                {loading && <ReactSpinner size={25} />}
            </div>
        </div>

    )
}

export default Cart
