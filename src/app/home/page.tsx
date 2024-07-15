// pages/index.tsx
import React from 'react';
import { productList } from 'src/data/mockData';
import ProductCard from 'src/components/ProductCard/ProductCard';

const LandingPage = () => {
  return (
    <div className="">
      <ul className="">
        {productList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
