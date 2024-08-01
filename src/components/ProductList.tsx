import React from 'react';
import { Product } from 'src/mock/types/product';
import ProductCard from './ProductCard/ProductCard';

type ProductListProps = {
    products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
    return (
        <div className="">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
