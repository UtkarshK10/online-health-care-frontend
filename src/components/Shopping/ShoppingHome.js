import React from 'react';
import ProductCard from './ProductCard';

const ShoppingHome = () => {
  const ProductArray = [
    {
      id: '1',
      name: 'Strepsils Lozenges Orange',
      price: '285',
      description: 'jar of 100 lozenges',
      imageUrl:
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1915&q=80',
      rating: 4.3,
    },
    {
      id: '2',
      name: 'Strepsils Lozenges Orange',
      price: '500',
      description: 'jar of 200 lozenges',
      imageUrl:
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
      rating: 3.6,
    },
    {
      id: '3',
      name: 'Strepsils Lozenges Orange',
      price: '700',
      description: 'jar of 300 lozenges',
      imageUrl:
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Strepsils Lozenges Orange',
      price: '900',
      description: 'jar of 400 lozenges',
      imageUrl:
        'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=677&q=80',
      rating: 3.1,
    },
    {
      id: '5',
      name: 'Strepsils Lozenges Orange',
      price: '1100',
      description: 'jar of 500 lozenges',
      imageUrl:
        'https://images.unsplash.com/photo-1558956397-6d8ef273344e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      rating: 3.9,
    },
  ];
  return (
    <div className='container'>
      <div className='row'>
        {ProductArray.map((Product, idx) => {
          return (
            <div key={idx}>
              <ProductCard Product={Product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingHome;
