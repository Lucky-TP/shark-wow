"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "src/components/NewProductCard/SingleProduct/SingleProductCard";
import { ShowProject } from "src/interfaces/models/common"; // Adjust the import path as needed
import { getProjectByCategories } from "src/services/apiService/projects/getProjectByCategories";
import { StatusCode } from "src/constants/statusCode";

type Props = {
    category?: string; // Optional category string
};

export default function CategoryProductCard({ category }: Props) {
    const [products, setProducts] = useState<ShowProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!category) {
                console.error("Category parameter is missing or undefined.");
                setLoading(false);
                return;
            }

            try {
                const response = await getProjectByCategories([
                    encodeURI(category),
                ]);
                console.log(response.status);
                if (response.status === StatusCode.SUCCESS) {
                    setProducts(response.data);
                } else {
                    setError(response.message || "Failed to fetch products");
                }
            } catch (error) {
                setError("An error occurred while fetching products.");
                console.error(
                    "An error occurred while fetching products:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section>
            <p className="pb-2 font-bold">{category}</p>
            <div className="pt-2 pb-4">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <li key={product.projectId} className="flex-shrink-0">
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
