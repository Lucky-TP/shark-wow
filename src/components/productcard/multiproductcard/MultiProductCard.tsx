import React from 'react'
import ProductCard from '../ProductCard'
import { productList } from 'src/mock/data/mockData'

type Props = {}

export default function MultiProductCard({}: Props) {
  return (
    <section>
        <p className='pb-2'>Category 1</p>
          <div className='pt-2 pb-4 flex flex-row'>
            <ul className='flex'>
            {productList.map(product => (
              <ProductCard key={product.projectId} product={product} />
            ))}
            </ul>
          </div>
    </section>
  )
}