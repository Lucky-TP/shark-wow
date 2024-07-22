'use client'
import React, { useState } from 'react';
import { Product } from 'src/types/product';
import Image from 'next/image';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps)  => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`w100p mb8`}>
      <div>
        <div className={`project-card-root relative flex flex-col w100p pointer gapx4/5 ${isHovered ? 'is-hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
          <div className="project-card-details project-card__basic-details flex flex-col grow1 px0">
              <span className="card-title type-20 medium lh24px clamp-1 mb0 relative">
                <a href="" className="project-card__title soft-black hover-soft-black keyboard-focusable focus-invisible ml-[40px]">
                  {product.title}
                </a>
                <span className="visibility-visible pointer-events-auto absolute t0 l0">
                  <Image src="/empty-heart.png" alt="Heart Icon" width={25} height={25} className="svg-icon__icon--project-we-love icon-20 mr4px valign-top no-outline mt-[8px]"/>
                </span>
              </span>
            <div className="flex flex-col gap4px grow1">
              <p className="type-14 lh16px medium clamp-1 mb0" style={{ color: "rgb(77, 77, 77)", letterSpacing: "0.28px" }}>
                {product.creator}
              </p>
              <div className="flex items-center">
                <Image src="/time.png" alt="Time Icon" width={16} height={16} style={{width:"16px", height:"16px"}}/>
                <p className="type-14 lh16px medium clamp-1 mb0 ml-[4px]" style={{ color: "rgb(77, 77, 77)", letterSpacing: "0.28px" }}>
                  {product.daysLeft} days left • {product.fundedPercentage}% funded
                </p>
              </div>
            </div>
          </div>
          <div className={`absolute bg-white expandable-background ${isHovered ? 'is-expanded' : ''}`} ></div>
          <div className="project-card__media">
            <a href="">
              <Image 
              src={`/${product.productImageUrl}`}
              alt="Product Image"
              width={560}
              height={315}
              className={`w100p z1 ${isHovered ? 'hide' : 'block'}`}
              style={{
                width: "100%",
                aspectRatio: "1.77778 / 1",
                borderTopRightRadius: "8px",
                borderTopLeftRadius: "8px",
              }}/>
            </a>
            <div className="flex flex-col relativee">
              <div className="w100p flex items-center justify-start">
                <div style={{ 
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderTopRightRadius: "0px",
                  backgroundColor: "rgb(5, 206, 120)",
                  width: `${product.fundedPercentage}%`,
                  height: "8px" }}>
                </div>
              </div>
            </div>
          </div>
          <div className="project-card-details project-card__grid-details w100p">
            <div className="flex items-end justify-between flex-col">
              <a href="">
                <Image src={`/${product.creatorImageUrl}`}
                width={40}
                height={40}
                alt="Creator Icon"
                className="avatar inline-block align-middle radius100p border border-grey-500 do-not-visually-track rounded-full"
                style={{
                  borderColor: "rgb(224, 224, 224)",
                  width: "4rem",
                  height: "4rem",
                  textIndent: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                />
              </a>
            </div>
            <div className="col-start-3 row-start-1 self-start">
              <div className="flex items-end justify-between flex-col h100p col-start-3 row-start-1">
                <div className="flex items-center justify-center mr-3px" style={{width: "2.4rem", height: "2.4rem"}}>
                  <button className="no-outline" aria-label="Save this project">
                    <Image src="/favorite.png" alt="Favorite Icon" width={24} height={24}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`project-card-root__extra-info-container project-card__expanded-details ${isHovered ? 'is-visible' : ''}`}>
            <div className="flex-col project-card-root__extra-info t100p click-through z3 l0 r0">
                <p className="type-16 lh24px pb3 soft-black m0">
                  {product.description}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;