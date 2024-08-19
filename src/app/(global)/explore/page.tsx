import React from 'react'
import ProductCard from 'src/components/productcard/ProductCard'

type Props = {}

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];

export default function page({}: Props) {
  return (
    <section className='flex flex-row justify-between py-[5vh] h-full w-full bg-orange-50'>

        <div className="flex flex-col w-2/12 item-left">
          <p className='text-xl font-bold mb-4'>Category</p>
          {categories.map((category, i) => (
            <button key={i} className="mb-2 item-left justify-left text-left">
              {category}
            </button>
          ))}
        </div>


        <div className='text-xl flex flex-col w-10/12'>
          <p className='pb-2'>Category 1</p>
          <div className='pt-2 pb-2 flex flex-row '>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
          </div>
          <p className='pb-2'>Category 2</p>
          <div className='pt-2 pb-2 flex flex-row '>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
          </div>
        </div>
        
    </section>
    
    // <section>
    //   {/* explore project page placeholder
    //   <ProductCard/> */}
    //   <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //   <ProductCard />
    // </div>
    // </section>
  )
}