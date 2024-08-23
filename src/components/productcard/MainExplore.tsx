"use client";
import React, { useState } from 'react';
import CarouselProductCard from 'src/components/productcard/CarouselProductCard';
import CarouselTrendingProduct from 'src/components/productcard/CarouselTrendingProduct';
import CategoryProductCard from 'src/components/productcard/CategoryProductCard';
import Withmock from './withmock';

type Props = {};

export default function MainExplore({}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['Food', 'Technology', 'Art', 'Film', 'House'];

  const handleCategoryClick = (category: string| null) => {
    setSelectedCategory(category);
  };

  return (
    <section className='flex flex-row justify-between py-[5vh] h-full w-full bg-orange-50'>
      <div className="flex flex-col w-2/12">
      <p 
          className='text-xl font-bold text-left ml-8 mb-4 cursor-pointer' 
          onClick={() => handleCategoryClick(null)}
        >
          Category
        </p>
        {categories.map((category, i) => (
          <button 
            key={i} 
            className={`ml-8 mb-2 text-left ${selectedCategory === category ? 'font-bold' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
        
      <div className='text-xl flex flex-col w-10/12'>
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
    </section>
  );
}
