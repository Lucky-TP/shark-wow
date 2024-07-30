import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState
  } from 'react'
  import { EmblaCarouselType } from 'embla-carousel'
  
  type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
  }
  
  export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
  ): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  
    const onDotButtonClick = useCallback(
      (index: number) => {
        if (!emblaApi) return
        emblaApi.scrollTo(index)
        if (onButtonClick) onButtonClick(emblaApi)
      },
      [emblaApi, onButtonClick]
    )
  
    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList())
    }, [])
  
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])
  
    useEffect(() => {
      if (!emblaApi) return
  
      onInit(emblaApi)
      onSelect(emblaApi)
      emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect])
  
    return {
      selectedIndex,
      scrollSnaps,
      onDotButtonClick
    }
  }
  
  type SlideType = {
    image: string;
    // add other properties of the slide object
  }
  
  type PropType = ComponentPropsWithRef<'button'> & { slide: SlideType, currentIndex: number }
  
  export const DotButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props
    console.log(props.slide.image)

    return (
      // className='border-2 border-gray-500 p-1 rounded-full
      <button
        type="button" {...restProps}
        className='cursor-pointer max-w-[5vw] min-w-[5vw]'
      > 
        <img src={props.slide.image} alt='' className='w-full'/>
      </button>
    )
  }
  