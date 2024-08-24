import React from 'react'
import MainExplore from 'src/components/productcard/MainExplore'

type Props = {}

export default function page({}: Props) {
  return (
    <section className='bg-orange-200'>
      <MainExplore/>
    </section>
  )
}