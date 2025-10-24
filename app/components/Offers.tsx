import { Carousel, CarouselContent, CarouselItem, } from "@/components/ui/carousel";

 const Offers = () => {



    
 return ( 
    <Carousel className="flex h-80 mt-6 rounded-2xl bg-[#B22222] w-full  shadow-2xl p-3">
        <CarouselContent className="h-full ">
            <CarouselItem className="text-white text-center h-full w-44 font-semibold grid place-items-center rounded-2xl  ">Incredible offers end in:</CarouselItem>
            
        </CarouselContent>
    </Carousel>

 );
}
export default Offers;