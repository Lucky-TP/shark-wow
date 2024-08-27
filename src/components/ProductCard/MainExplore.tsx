"use client";
import React, { useState } from 'react';
import CarouselProductCard from 'src/components/ProductCard/CarouselProductCard';
import CarouselTrendingProduct from 'src/components/ProductCard/CarouselTrendingProduct';
import CategoryProductCard from 'src/components/ProductCard/CategoryProductCard';
import Withmock from './Withmock';
import SearchBar from '../global/SearchBar';

type Props = {};

export default function MainExplore({}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['Food', 'Technology', 'Art', 'Film', 'House'];

  const handleCategoryClick = (category: string| null) => {
    setSelectedCategory(category);
  };

  return (
    <section className='flex flex-col justify-between py-[3vh] h-full w-full bg-orange-50'>
      <div className='flex'>
        <div style={{ width: `21%` }}>
        </div>
        <div className='pb-[3vh]' style={{ width: `73%` }}>
          <SearchBar/>
        </div>
      </div>
      <div className='flex'>
        <div className="flex flex-col" style={{ width: `21%` }}>
        <p 
            className='text-xl font-bold text-left ml-12 mb-4 cursor-pointer' 
            onClick={() => handleCategoryClick(null)}
          >
            Category
          </p>
          {categories.map((category, i) => (
            <button 
              key={i} 
              className={`ml-12 mb-2 text-left ${selectedCategory === category ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='text-xl flex flex-col' style={{ width: `73%` }}>
          {!selectedCategory && (
            <>
              {/* <Withmock category='Food'/> */}
              <CarouselTrendingProduct />
              <CarouselProductCard category="Food" />
              <CarouselProductCard category="Technology" />
              <CarouselProductCard category="Art" />
              <CarouselProductCard category="Film" />
              <CarouselProductCard category="House" />
            </>
          )}

          {selectedCategory === 'Food' && (
            <CategoryProductCard category="Food" />
          )}
          {selectedCategory === 'Technology' && (
            <CategoryProductCard category="Technology" />
          )}
          {selectedCategory === 'Art' && (
            <CategoryProductCard category="Art" />
          )}
          {selectedCategory === 'Film' && (
            <CategoryProductCard category="Food" />
          )}
          {selectedCategory === 'House' && (
            <CategoryProductCard category="House" />
          )}       
          
        </div>
      </div>
    </section>
  );
}
