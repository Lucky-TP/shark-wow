import React from 'react'
import Project from "src/components/account/project/project";
import CarouselProductCard from "src/components/productcard/CarouselProductCard"
import Myfundingproject from "src/components/account/project/myfundingproject";
type Props = {}

export default function page({}: Props) {
  return (
    <section className="">
            <Project/> 
            <CarouselProductCard/>
            <Myfundingproject/>
            <CarouselProductCard/>
        </section>
  )
}