import React, { useState, useEffect, useContext, useRef } from 'react';
import Pdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print'
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import healthcare from '../../assets/healthcare.svg';
import '../../styles/Invoice.css'


const InvoiceData = {
    name: "Test",
    order_no: "1",
    order_date: "26 Nov, 2020",
    shipping_address: "blah blah",
    invoice_number: "123",
    products: [
        {
            prod_name: "prod1",
            image_url: "",
            price: "20",
            quantity: "2",
        },
        {
            prod_name: "prod2",
            image_url: "",
            price: "21",
            quantity: "3",
        }
    ],
    sub_total: 190,
    discount: 0,
    tax: 10,
    total: 200,
}

const Invoice = () => {
    const { auth } = useContext(AuthContext);
    const [invoiceData, setInvoiceData] = useState(InvoiceData);
    const pdfRef = useRef();
    const filename = `Invoice_${invoiceData.invoice_number}`;

    // const pxToMm = (px) => {
    //     return Math.floor(px / document.getElementById('myMm').offsetHeight);
    // };

    // const mmToPx = (mm) => {
    //     return document.getElementById('myMm').offsetHeight * mm;
    // };

    // const range = (start, end) => {
    //     return Array(end - start).join(0).split(0).map(function (val, id) { return id + start });
    // };

    // const downloadInvoice = () => {
    //     const input = document.getElementById('pageToPrint');
    //     const inputHeightMm = pxToMm(input.offsetHeight);
    //     const a4WidthMm = 210;
    //     const a4HeightMm = 297;
    //     const a4HeightPx = mmToPx(a4HeightMm);
    //     const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm / a4HeightMm) + 1;
    //     console.log({
    //         input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages),
    //         comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
    //     });


    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             let pdf;
    //             // Document of a4WidthMm wide and inputHeightMm high
    //             if (inputHeightMm > a4HeightMm) {
    //                 // elongated a4 (system print dialog will handle page breaks)
    //                 pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
    //             } else {
    //                 // standard a4
    //                 pdf = new jsPDF();
    //             }

    //             pdf.addImage(imgData, 'PNG', 0, 0);
    //             pdf.save(`${filename}.pdf`);
    //         });
    // }

    return (
        <div className="container" style={{
            margin: "0 '5%'"
        }}>

            <div className="row" ref={pdfRef}>
                <div className="col s12">
                    <div className="card logo">
                        <div className="left" style={{ padding: '2% 5%' }}> <img src={healthcare} width="75" alt="logo" />
                        </div>
                        <div className="right" style={{ marginRight: "20px", fontSize: "1.8em" }}>
                            <p className="grey-text" style={{ display: "inline-block", padding: "10px" }}>Invoice Number: </p><span style={{ display: "inline-block" }}>#{invoiceData.invoice_number}</span>
                        </div>
                        <div className="invoice">
                            <div className="col s12">
                                <h5 className="">Your order Confirmed!</h5>
                                <div className="col s12 left">
                                    <p className="left" style={{ fontWeight: 600 }}>Hello, {invoiceData.name}</p>

                                </div>
                                <p className="left">Your order has been confirmed and will be shipped in next few days!</p>
                            </div>
                            <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                <table className="centered">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ padding: "2% 0" }}> <p className="grey-text">Order Date</p> <p>12 Jan,2018</p> </div>
                                            </td>
                                            <td>
                                                <div style={{ padding: "2% 0" }}> <p className="grey-text">Order No</p> <p>MT12332345</p> </div>
                                            </td>
                                            <td>
                                                <div style={{ padding: "2% 0" }}> <p className="grey-text">Payment</p> <p><img src="https://img.icons8.com/color/48/000000/visa.png" width="40" alt="prod1" /></p> </div>
                                            </td>
                                            <td>
                                                <div style={{ padding: "2% 0" }}> <p className="grey-text">Shiping Address</p> <p>414 Advert Avenue, NY,USA</p> </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="product border-bottom table-responsive ">
                                <table className="table table-borderless centered">
                                    <tbody>
                                        <tr>
                                            <td width="20%"> <img src="https://i.imgur.com/SmBOua9.jpg" width="70" alt="xyz" /> </td>
                                            <td width="60%"> <span className="font-weight-bold">Men's Collar T-shirt</span>
                                                <div className="product-qty"> <span className="grey-text font-weight-bold">1 Unit</span></div>
                                            </td>
                                            <td width="20%">
                                                <div className="right price"> <span className="font-weight-bold">77.50 cr.</span> </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col m7">

                                </div>
                                <div className="col m5">
                                    <table className="table table-borderless centered">
                                        <tbody className="totals">
                                            <tr className="no-border">
                                                <td>
                                                    <div className="left"> <span className="grey-text">Subtotal</span> </div>
                                                </td>
                                                <td>
                                                    <div className="right price"> <span>168.50 cr.</span> </div>
                                                </td>
                                            </tr>
                                            <tr className="no-border">
                                                <td>
                                                    <div className="left"> <span className="grey-text">Shipping Fee</span> </div>
                                                </td>
                                                <td>
                                                    <div className="right price"> <span>22 cr.</span> </div>
                                                </td>
                                            </tr>
                                            <tr className="no-border">
                                                <td>
                                                    <div className="left"> <span className="grey-text">Tax Fee</span> </div>
                                                </td>
                                                <td>
                                                    <div className="right price"> <span>7.65 cr.</span> </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="left"> <span className="grey-text">Discount</span> </div>
                                                </td>
                                                <td>
                                                    <div className="right price"> <span className="deep-orange-text darken-1">168.50 cr.</span> </div>
                                                </td>
                                            </tr>
                                            <tr className="border-top border-bottom">
                                                <td>
                                                    <div className="left"> <span style={{ fontWeight: 600 }}>Total</span> </div>
                                                </td>
                                                <td>
                                                    <div className="right"> <span style={{ fontWeight: 600 }}>238.50 cr.</span> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="font-weight-bold mb-0">Thanks for shopping with us!</p> <span><b>Care More</b> Team</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='row'>

                <ReactToPrint
                    trigger={() => {
                        return (<div className='input-field'>
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
                        )
                    }}
                    content={() => pdfRef.current}>
                </ReactToPrint>
            </div>
        </div>
    )
}

export default Invoice
