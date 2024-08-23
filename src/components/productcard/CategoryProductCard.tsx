"use client";

import React, { useRef } from 'react';
import ProductCard from './ProductCard'
import { productList } from 'src/mock/data/mockData'

type Props = {
    category?: string;  // Optional category string
  };

export default function CategoryProductCard({category}: Props) {
    const filteredProductList = category
    ? productList.filter(product => product.category === category)
    : productList;

    return(
        <section>
            <p className='pb-2 font-bold'>{category}</p>
            <div className='pt-2 pb-4'>
                <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {filteredProductList.map(product => (
                    <li key={product.projectId} className='flex-shrink-0'>
                        <ProductCard product={product} />
                    </li>
                    ))}
                </ul>
            </div>
        </section>
    )

}
