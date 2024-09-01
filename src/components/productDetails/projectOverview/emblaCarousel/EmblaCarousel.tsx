import React, { useCallback, useEffect, useState } from 'react'

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

import './embra.css'

import { Image , Spin} from 'antd'

import Skeleton from '@mui/material/Skeleton';




type PropType = {
  slides: any[]
  options?: EmblaOptionsType
  isLoading: boolean
}

const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)


  return (
    <section className="flex flex-col items-center justify-center embla w-full h-full gap-y-[3vh]">
      {
        (props.isLoading ) &&
        <div className='flex w-full h-full items-center justify-center'>
            <Spin 
              size='large'
              style={{fontSize: '2rem', color: '#fbd38d'}}
              className='flex text-2xl text-orange-300 font-semibold absolute z-10'>
            </Spin>
            <Skeleton
                variant="rectangular"
                className='w-full h-full rounded-lg bg-orange-200'
            />                  
        </div>
      }
      {
        !props.isLoading && slides.length === 0  &&
        <div className='flex w-full h-full items-center justify-center'>
          <h2 className='flex text-2xl text-orange-300 font-semibold absolute z-10'>
            Creator has not uploaded any images yet
          </h2>
          <Skeleton
            variant="rectangular"
            className='w-full h-full rounded-lg bg-orange-200'
          />                  
        </div>
      }
      {
        !props.isLoading && slides.length !== 0 &&
          <div className="embla__viewport overflow-x-hidden h-[70vh]" ref={emblaRef}>
            <div className="embla__container h-full flex items-center">
              {slides.map((e) => (
                <div className="embla__slide" key={e.id}>
                  <div className="embla__slide__number">
                    <Image src={e.image} alt='' />
                  </div>
                </div>
              ))}
            </div>
          </div>        
      }
      <div className="flex flex-row justify-between px-[1vw] w-full">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="flex flex-row items-center justify-center gap-x-[0.5vw] overflow-x-auto max-w-[30vw] px-[3vw]">
          {slides.map((slide, index) => (
            <DotButton
              slide={slide}
              key={slide.id}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  )
}

export default EmblaCarousel