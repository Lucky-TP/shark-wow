import React from 'react'
import ProductCard from 'src/components/productcard/ProductCard'

type Props = {}

export default function page({}: Props) {
  return (
    <section>
      {/* explore project page placeholder
      <ProductCard/> */}
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard />
    </div>
    </section>
  )
}