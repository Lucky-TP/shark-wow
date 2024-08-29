"use client";
import React, { useEffect, useState } from 'react';
import CarouselProductCard from 'src/components/productcard/CarouselProduct/CarouselProductCard';
import CarouselTrendingProductCard from './CarouselProductTopTen/CarouselTrendingProduct';
import CategoryProductCard from './CategoryProduct/CategoryProductCard';
import SearchBar from '../SearchBar';
import { ShowProject } from 'src/interfaces/models/common';
import { getProjectByCategories } from 'src/services/apiService/projects/getProjectByCategories';

interface AllData {
  categories: string[],
  Food: ShowProject[],
  Technology: ShowProject[],
  Art: ShowProject[],
  Film: ShowProject[],
  House: ShowProject[],
}

export default function MainExplore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['Food', 'Technology', 'Art', 'Film', 'House'];
  const [data, setData] = useState<AllData>({
    categories: ['Food', 'Technology', 'Art', 'Film', 'House'],
    Food: [],
    Technology: [],
    Art: [],
    Film: [],
    House: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodResponse = await getProjectByCategories(['Food']);
        const technologyResponse = await getProjectByCategories(['Technology']);
        const artResponse = await getProjectByCategories(['Art']);
        const filmResponse = await getProjectByCategories(['Film']);
        const houseResponse = await getProjectByCategories(['House']);

        setData(prevData => ({
          ...prevData,
          Food: foodResponse.data,
          Technology: technologyResponse.data,
          Art: artResponse.data,
          Film: filmResponse.data,
          House: houseResponse.data,
        }));
      } catch (error) {
        setError('An error occurred while fetching data.');
        console.error('An error occurred while fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <section className='flex flex-col justify-between py-[3vh] h-full w-full bg-orange-50'>
      <div className='flex'>
        <div style={{ width: `21%` }}>
        </div>
        <div className='pb-[3vh]' style={{ width: `73%` }}> 
          <SearchBar />
        </div>
      </div>
      <div className='flex'>
        <div className="flex flex-col" style={{ width: `21%` }}>
          <p 
            className='text-xl font-bold text-left ml-12 mb-4 cursor-pointer' 
            onClick={() => handleCategoryClick(null)}
          >
            Category
          </p>
          {categories.map((category, i) => (
            <button 
              key={i} 
              className={`ml-12 mb-2 text-left ${selectedCategory === category ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='text-xl flex flex-col' style={{ width: `73%` }}>
          {!selectedCategory && (
            <>
              <CarouselTrendingProductCard />
              <CarouselProductCard title="Food" data={data.Food} />
              <CarouselProductCard title="Technology" data={data.Technology} />
              <CarouselProductCard title="Art" data={data.Art} />
              <CarouselProductCard title="Film" data={data.Film} />
              <CarouselProductCard title="House" data={data.House} />
            </>
          )}
          {selectedCategory && (
            <CategoryProductCard category={selectedCategory} />
          )}
          
        </div>
      </div>
    </section>
  );
}
