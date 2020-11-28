import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import queryString from 'query-string';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import healthcare from '../../assets/healthcare.svg';
import '../../styles/Invoice.css';
import ReactSpinner from '../ReactSpinner';

const Invoice = (props) => {
  const searchString = queryString.parse(props.location.search);
  const { id } = searchString;
  const { auth } = useContext(AuthContext);
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef();

  useEffect(() => {
    if (auth?.token) {
      setLoading(true);
      axios
        .get(`/api/orders/invoice/${id}`, {
          headers: {
            'api-token': auth?.token,
          },
        })
        .then((res) => {
          setInvoiceData(res.data.invoice);

          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, [auth?.token, id]);

  const formatDate = (date) => {
    return date.split('T')[0].toString().split('-').reverse().join('/');
  };

  if (loading) {
    return (
      <div className='container'>
        <ReactSpinner size='50px' />
      </div>
    );
  }

  return (
    <div
      className='container'
      style={{
        margin: "0 '5%'",
      }}
    >
      <div className='row' ref={pdfRef}>
        <div className='col s12'>
          <div className='card logo'>
            <div className='left' style={{ padding: '2% 5%' }}>
              {' '}
              <img src={healthcare} width='75' alt='logo' />
            </div>
            <div
              className='right'
              style={{ marginRight: '20px', fontSize: '1.8em' }}
            >
              <p
                className='grey-text'
                style={{ display: 'inline-block', padding: '10px' }}
              >
                Invoice Number:{' '}
              </p>
              <span style={{ display: 'inline-block' }}>
                #{invoiceData.Invoice_No}
              </span>
            </div>
            <div className='invoice'>
              <div className='col s12'>
                <h5 className=''>Your order Confirmed!</h5>
                <div className='col s12 left'>
                  <p className='left' style={{ fontWeight: 600 }}>
                    Hello, {invoiceData.Name}
                  </p>
                </div>
                <p className='left'>
                  Your order has been confirmed and will be shipped in next few
                  days!
                </p>
              </div>
              <div className='payment border-top mt-3 mb-3 border-bottom table-responsive'>
                <table className='centered'>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ padding: '2% 0' }}>
                          {' '}
                          <p className='grey-text'>Order Date</p>{' '}
                          <p>{formatDate(invoiceData.Order_Date)}</p>{' '}
                        </div>
                      </td>
                      <td>
                        <div style={{ padding: '2% 0' }}>
                          {' '}
                          <p className='grey-text'>Order No</p>{' '}
                          <p>{invoiceData['Order_No.']}</p>{' '}
                        </div>
                      </td>
                      <td>
                        <div style={{ padding: '2% 0' }}>
                          {' '}
                          <p className='grey-text'>Payment</p>{' '}
                          <p>
                            <img
                              src='https://img.icons8.com/color/48/000000/visa.png'
                              width='40'
                              alt='prod1'
                            />
                          </p>{' '}
                        </div>
                      </td>
                      <td>
                        <div style={{ padding: '2% 0' }}>
                          {' '}
                          <p className='grey-text'>Shiping Address</p>{' '}
                          <p>
                            {invoiceData.Shipping_Address.house_number},{' '}
                            {invoiceData.Shipping_Address.street} -{' '}
                            {invoiceData.Shipping_Address.zip_code},{' '}
                            {invoiceData.Shipping_Address.city},{' '}
                            {invoiceData.Shipping_Address.state}
                          </p>{' '}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='product border-bottom table-responsive '>
                <table className='table table-borderless centered'>
                  <tbody>
                    {invoiceData.Products.map((product, idx) => (
                      <tr key={idx}>
                        <td width='20%'>
                          {' '}
                          <img
                            src={product.image_url}
                            width='70'
                            alt={product.name}
                          />{' '}
                        </td>
                        <td width='60%'>
                          {' '}
                          <span className='font-weight-bold'>
                            {product.name}
                          </span>
                          <div className='product-qty'>
                            {' '}
                            <span className='grey-text font-weight-bold'>
                              {product.quantity}{' '}
                              {product.quantity > 1 ? 'Units' : 'Unit'}
                            </span>
                          </div>
                        </td>
                        <td width='20%'>
                          <div className='right price'>
                            {' '}
                            <span className='font-weight-bold'>
                              {product.price} cr.
                            </span>{' '}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='row'>
                <div className='col m7'></div>
                <div className='col m5'>
                  <table className='table table-borderless centered'>
                    <tbody className='totals'>
                      <tr className='no-border'>
                        <td>
                          <div className='left'>
                            {' '}
                            <span className='grey-text'>Subtotal</span>{' '}
                          </div>
                        </td>
                        <td>
                          <div className='right price'>
                            {' '}
                            <span>{invoiceData.Sub_Total} cr.</span>{' '}
                          </div>
                        </td>
                      </tr>
                      <tr className='no-border'>
                        <td>
                          <div className='left'>
                            {' '}
                            <span className='grey-text'>SGST</span>{' '}
                          </div>
                        </td>
                        <td>
                          <div className='right price'>
                            {' '}
                            <span>{invoiceData.SGST} cr.</span>{' '}
                          </div>
                        </td>
                      </tr>
                      <tr className='no-border'>
                        <td>
                          <div className='left'>
                            {' '}
                            <span className='grey-text'>CGST</span>{' '}
                          </div>
                        </td>
                        <td>
                          <div className='right price'>
                            {' '}
                            <span>{invoiceData.CGST} cr.</span>{' '}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='left'>
                            {' '}
                            <span className='grey-text'>GST</span>{' '}
                          </div>
                        </td>
                        <td>
                          <div className='right price'>
                            {' '}
                            <span className='deep-orange-text darken-1'>
                              {invoiceData.GST} cr.
                            </span>{' '}
                          </div>
                        </td>
                      </tr>
                      <tr className='border-top border-bottom'>
                        <td>
                          <div className='left'>
                            {' '}
                            <span style={{ fontWeight: 600 }}>Total</span>{' '}
                          </div>
                        </td>
                        <td>
                          <div className='right'>
                            {' '}
                            <span style={{ fontWeight: 600 }}>
                              {invoiceData.Total} cr.
                            </span>{' '}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className='font-weight-bold mb-0'>
                Thanks for shopping with us!
              </p>{' '}
              <span>
                <b>Care More</b> Team
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <ReactToPrint
          trigger={() => {
            return (
              <div className='input-field'>
                <button
                  className='btn btn-large pcolour btn-register waves-effect waves-light hover'
                  // onClick={e => {
                  //     e.preventDefault();
                  //     downloadInvoice();
                  // }}
                >
                  Print
                  <i className='material-icons left'>get_app</i>
                </button>
              </div>
            );
          }}
          content={() => pdfRef.current}
        ></ReactToPrint>
      </div>
    </div>
  );
};

export default Invoice;
