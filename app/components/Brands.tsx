'use client'
import React from "react";
import { Carousel, CarouselContent, CarouselItem, } from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
 const Brands = () => {
     const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const Products=[
    {id:1,pic:'/apple.webp'},
    {id:2,pic:'/samsung.webp'},
    {id:3,pic:'/jbl.webp'},
    {id:4,pic:'/jbl.webp'},
    {id:5,pic:'/qcy.webp'},
    {id:6,pic:'/sony.webp'},
    {id:7,pic:'/anker.webp'},
  ]


 return ( <div className="shadow-xl ">
    <Carousel plugins={[plugin.current]} opts={{loop:true,active:true}} > 
        <CarouselContent >
            {Products.map((product)=>{
                return <CarouselItem  key={product.id}><Image className="max-sm:h-40 sm:h-44 md:h-60 lg:h-72 xl:h-96 h-60 max-w-full min-w-lg items-stretch " height={400} width={2180} src={product.pic} alt="some image"/>
                </CarouselItem>
            })}
        </CarouselContent>
    </Carousel>
 </div>);
}
export default Brands;