import React from 'react';
import CarouselProductCard from 'src/components/productcard/CarouselProductCard';
import CategoryProductCard from 'src/components/productcard/CategoryProductCard';

type Props = {};

export default function page({}: Props) {
  const categories = ['Food', 'Technology', 'Art', 'File', 'House'];

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
        <p className='pb-2 font-bold'>Trending</p>
        <CarouselProductCard />

        <CarouselProductCard category="Food" />

        <CarouselProductCard category="Technology" />
      </div>

      {/* <div className='text-xl flex flex-col w-10/12 mr-20 ml-20'>
        <CategoryProductCard category="Food"/>
      </div> */}

    </section>
  );
}
