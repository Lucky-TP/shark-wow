"use client";
import React, { useEffect, useState } from 'react';
import CarouselProductCard from 'src/components/NewProductCard/CarouselProduct/CarouselProductCard';
import CarouselTrendingProductCard from './CarouselProductTopTen/CarouselTrendingProduct';
import CategoryProductCard from './CategoryProduct/CategoryProductCard';
import SearchBar from '../SearchBar';
import { ShowProject } from 'src/interfaces/datas/project';
import { getProjectByCategories } from 'src/services/apiService/projects/getProjectByCategories';
import LoadingPage from '../LoadingPage';

interface AllData {
  categories: string[],
  Food: ShowProject[],
  Technology: ShowProject[],
  Art: ShowProject[],
  Film: ShowProject[],
  Education: ShowProject[],
  Music: ShowProject[],
  Transportation: ShowProject[],
  Health: ShowProject[],
  Game: ShowProject[],  // Fixed the type here
}

export default function MainExplore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const category = ['Technology', 'Education', 'Art', 'Film', 'Music','Food','Transportation','Health','Game'];
  const [data, setData] = useState<AllData>({
    categories: ['Technology', 'Education', 'Art', 'Film', 'Music','Food','Transportation','Health','Game'],
    Technology: [],
    Education: [],
    Art: [],
    Film: [],
    Music: [],
    Food: [],
    Transportation: [],
    Health: [],
    Game: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const foodResponse = await getProjectByCategories(['Food']);
        const technologyResponse = await getProjectByCategories(['Technology']);
        const artResponse = await getProjectByCategories(['Art']);
        const filmResponse = await getProjectByCategories(['Film']);
        const educationResponse = await getProjectByCategories(['Education']);
        const musicResponse = await getProjectByCategories(['Music']);
        const gameResponse = await getProjectByCategories(['Game']);
        const healthResponse = await getProjectByCategories(['Health']);
        const transportationResponse = await getProjectByCategories(['Transportation']);
        
        setData(prevData => ({
          ...prevData,
          Food: foodResponse.data,
          Technology: technologyResponse.data,
          Art: artResponse.data,
          Film: filmResponse.data,
          Education: educationResponse.data,
          Music: musicResponse.data,
          Game: gameResponse.data,
          Health: healthResponse.data,
          Transportation: transportationResponse.data
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

  if (loading) return <LoadingPage />;
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
          {category.map((category, i) => (
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
              {data.Technology.length!=0 && <CarouselProductCard title="Technology" data={data.Technology} />}
              {data.Education.length!=0 && <CarouselProductCard title="Education" data={data.Education} />}
              {data.Art.length!=0 && <CarouselProductCard title="Art" data={data.Art} />}
              {data.Film.length!=0 && <CarouselProductCard title="Film" data={data.Film} />}
              {data.Music.length!=0 && <CarouselProductCard title="Music" data={data.Music} />}
              {data.Food.length!=0 && <CarouselProductCard title="Food" data={data.Food} />}
              {data.Transportation.length!=0 && <CarouselProductCard title="Transportation" data={data.Transportation} />}
              {data.Health.length!=0 && <CarouselProductCard title="Health" data={data.Health} />}
              {data.Game.length!=0 && <CarouselProductCard title="Game" data={data.Game} />}
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
