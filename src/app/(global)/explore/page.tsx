import React from 'react'
import MultiProductCard from 'src/components/productcard/multiproductcard/MultiProductCard';

type Props = {}

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];

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
          <MultiProductCard/>
          <MultiProductCard/>
          <MultiProductCard/>
        </div>
        
    </section>
  )
}