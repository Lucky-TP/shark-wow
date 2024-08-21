import React from 'react';
import MultiProductCard from 'src/components/productcard/multiproductcard/MultiProductCard';

type Props = {};

const categories = ['Food', 'Technology', 'Art', 'File', 'House'];

export default function page({}: Props) {
  return (
    <section className='flex flex-row justify-between py-[5vh] h-full w-full bg-orange-50'>
      <div className="flex flex-col w-2/12">
        <p className='text-xl font-bold text-left ml-8 mb-4'>Category</p>
        {categories.map((category, i) => (
          <button key={i} className="ml-8 mb-2 text-left">
            {category}
          </button>
        ))}
      </div>

      <div className='text-xl flex flex-col w-10/12'>
      <p className='pb-2'>Trending</p>
        {/* First Row: All Products */}
        <MultiProductCard />

        {/* Second Row: Technology Products */}
        <MultiProductCard category="Food" />

        {/* Third Row: Food Products */}
        <MultiProductCard category="Technology" />
      </div>
    </section>
  );
}
