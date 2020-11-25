import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../Pagination';
// import ReactSpinner from '../ReactSpinner';
import ProductCard from './ProductCard';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';

const ShoppingHome = () => {
  const { auth } = useContext(AuthContext);


  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [productsPerPage] = useState(3);
  const [filteredProducts, setFilteredProducts] = useState(
    []
  );
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
      setFilteredProducts(products);
    }
  }, [searchString, products, productsPerPage, currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const idxOfLastProduct = pageNumber * productsPerPage;
    const idxOfFirstProduct = idxOfLastProduct - productsPerPage;
    // if (searchString) {
    //   setFilteredProducts(products.slice(idxOfFirstProduct, idxOfLastProduct).filter(product => {
    //     return product.name.toLowerCase().includes(searchString.toLowerCase())
    //   }));
    // }
    if (!searchString) {
      setFilteredProducts(products.slice(idxOfFirstProduct, idxOfLastProduct));
    }
  };
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
      .catch((e) => {
        console.log(e);
      });
  }, [auth?.token]);

  //  if(loading) {
  //   return <ReactSpinner size={50}/>
  // }

  return (
    <div className='container'><br></br>
      <div className='row'>
        <div className='col s11 m6'>
          <div className='input-field'><i className="material-icons prefix">search</i>
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
              <ProductCard Product={Product} />
            </div>
          );
        })}
      </div>

      <Pagination
        itemsPerPage={productsPerPage}
        totalItems={!searchString ? products.length : len}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ShoppingHome;
