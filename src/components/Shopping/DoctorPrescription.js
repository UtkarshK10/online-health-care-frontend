import React, { useState, useEffect, useContext } from 'react';
// import ReactSpinner from '../ReactSpinner';
import ProductCard from './ProductCard';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/auth-context';
import SearchMed from '../../assets/search_med.png';
import Sad from '../../assets/sad.png';
import Prescription from './Prescription';
import queryString from 'query-string';

// const fakeData = [
//   {
//     id: '1',
//     name: 'Glucon D',
//     description: 'Champ ke liye gift',
//     quantity: '3',
//     instruction: '',
//   },
//   {
//     id: '2',
//     name: 'Glucon D Nimbu',
//     description: 'Champ ke liye gift',
//     quantity: '1',
//     instruction: '',
//   },
//   {
//     id: '3',
//     name: 'Glucon D Orange',
//     description: 'Champ ke liye gift',
//     quantity: '2',
//     instruction: '',
//   },
// ];

const DoctorPrescription = (props) => {
  const searchID = queryString.parse(props.location.search);
  const { id } = searchID;
  const [searchString, setSearchString] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { auth } = useContext(AuthContext);
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    if (searchString) {
      const tempProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchString.toLowerCase());
      });
      setFilteredProducts(tempProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [products, searchString]);

  useEffect(() => {
    axios
      .get('/api/medicines/', {
        headers: {
          'api-token': auth?.token,
        },
      })
      .then((res) => {
        setProducts(res.data.msg);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [auth?.token]);

  const handleAddToPrescription = (product) => {
    let findproduct = prescription.find((p) => p.id === product.id);
    if (!findproduct) {
      setPrescription([...prescription, product]);
    } else {
      if (findproduct.quantity === 10) return;
      findproduct.quantity += 1;
      const filteredProduct = prescription.filter(
        (p) => p.id !== findproduct.id
      );
      setPrescription([...filteredProduct, findproduct]);
    }
  };

  const handleEdit = (id, qty) => {
    setPrescription(
      prescription.map((p) => {
        let updatedQty = +p.quantity;
        updatedQty += qty;
        // console.log(updatedQty);
        if (updatedQty > 0 && updatedQty < 11) {
          p.quantity = updatedQty;
          return p;
        }
        return p;
      })
    );
  };
  const handleDelete = (id) => {
    setPrescription(prescription.filter((p) => p.id !== id));
  };

  const handleInstruction = (val, id) => {
    console.log(id);
    setPrescription(
      prescription.map((p) => {
        if (p.id === id) {
          p.instruction = val;
          console.log('inside if', p);
          return p;
        }
        return p;
      })
    );
  };

  return (
    <div className='container '>
      <div className='card'>
        <div className='row'>
          <div className='col s12 m12 l4 pre-container'>
            <div className='row'>
              <div className='col s12 m12 l12'>
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
            {filteredProducts.length === 0 && !searchString ? (
              <div className='row'>
                <img
                  src={SearchMed}
                  style={{ width: '100px' }}
                  alt='Search Medicines'
                />
              </div>
            ) : filteredProducts.length === 0 && searchString ? (
              <div className='row'>
                <div className='col s12 m12 l12'>
                  <h4>No results found!!</h4>
                  <img src={Sad} alt='' className=' col s6 offset-s3' />
                </div>
              </div>
            ) : (
              <div className='row'>
                {filteredProducts.map((Product, idx) => {
                  return (
                    <div key={idx}>
                      <div className='col s10 m10 l10 offset-l1 offset-m1 offset-s1'>
                        <ProductCard
                          Product={Product}
                          Prescription
                          addToPrescription={handleAddToPrescription}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className='col s12 m12 l8 pre-container'
            style={{ overflow: 'scroll' }}
          >
            <Prescription
              prescription={prescription}
              editPrescription={handleEdit}
              deletePrescription={handleDelete}
              editInstruction={handleInstruction}
              recordID={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescription;