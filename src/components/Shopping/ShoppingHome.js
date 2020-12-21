import React, { useState, useEffect, useContext } from 'react';
// import Pagination from '../Pagination';
import M from 'materialize-css/dist/js/materialize.min.js';
import ProductCard from './ProductCard';
import axios from '../../axios/axios';
import ReactPaginate from 'react-paginate';
import { AuthContext } from '../../contexts/auth-context';

const ShoppingHome = () => {
  const { auth } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage] = useState(3);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [len, setLen] = useState(products.length);
  const handleChange = (e) => {
    setSearchString(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const idxOfLastProduct = currentPage * productsPerPage;
    const idxOfFirstProduct = idxOfLastProduct - productsPerPage;
    if (searchString && searchString.length > 0) {
      const tempProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchString.toLowerCase());
      });
      setLen(tempProducts.length);
      setFilteredProducts(
        tempProducts.slice(idxOfFirstProduct, idxOfLastProduct)
      );
    }
    if (searchString.length === 0) {
      setFilteredProducts(products.slice(idxOfFirstProduct, idxOfLastProduct));
    }
  }, [searchString, products, productsPerPage, currentPage]);

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   const idxOfLastProduct = pageNumber * productsPerPage;
  //   const idxOfFirstProduct = idxOfLastProduct - productsPerPage;

  //   if (!searchString) {
  //     setFilteredProducts(products.slice(idxOfFirstProduct, idxOfLastProduct));
  //   }
  // };
  useEffect(() => {
    axios
      .get('/api/medicines/', {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {
        setFilteredProducts(res.data.msg.slice(0, 3));
        setProducts(res.data.msg);
      })
      .catch((err) => {
        if (err?.response) {
          M.toast({ html: err?.response?.data?.msg });
        } else if (err?.request) {
          M.toast({ html: err?.request?.toString() });
        } else {
          M.toast({ html: 'Something went wrong, please try again' });
        }
      });
  }, [auth?.token]);

  //  if(loading) {
  //   return <ReactSpinner size="50px"/>
  // }
  const handlePageClick = (data) => {
  
    const pageNumber = data.selected + 1;
    setCurrentPage(pageNumber);
    const idxOfLastProduct = pageNumber * productsPerPage;
    const idxOfFirstProduct = idxOfLastProduct - productsPerPage;
    if (!searchString) {
      setFilteredProducts(products.slice(idxOfFirstProduct, idxOfLastProduct));
    }
  };

  const calcCount = () => {
    if (!searchString) {
      return Math.ceil(products.length / productsPerPage);
    } else {
      return Math.ceil(len / productsPerPage);
    }
  };

  return (
    <div className='container'>
      <br></br>
      <div className='row'>
        <div className='col s11 m6'>
          <div className='input-field'>
            <i className='material-icons prefix'>search</i>
            <input
              value={searchString}
              onSubmit={handleChange}
              onChange={handleChange}
              id='search_medicines'
              type='text'
              className='validate'
            />
            <label htmlFor='search_medicines'>Search Medicines</label>
          </div>
        </div>
      </div>
      <div className='row'>
        {filteredProducts.map((Product, idx) => {
          return (
            <div key={idx}>
              <div className='col s12 m6 l4'>
                <ProductCard Product={Product} />
              </div>
            </div>
          );
        })}
      </div>

      {/* <Pagination
        itemsPerPage={productsPerPage}
        totalItems={!searchString ? products.length : len}
        currentPage={currentPage}
        paginate={paginate}
      /> */}
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={calcCount()}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'shadow-pagination'}
      />
    </div>
  );
};

export default ShoppingHome;
