import Image from "next/image";
import Link from "next/link";
import { ProductCategories } from "../lib/mock";

 const Categoreis = () => {

  


 return ( <div >
    <h1 className="flex justify-center lg:text-2xl my-7 mb-10"> Shop based on category :</h1>
   <div className="flex flex-wrap gap-5 justify-center">
     {ProductCategories.map(prod=><Link key={prod.id} href={'products?category='+prod.category}>
    <Image className="lg:size-40 max-sm:size-20 sm:size-24 md:size-28 " width={200} height={200} src={prod.src} alt={prod.name}>

    </Image>
 </Link>)}
   </div>
 </div>);
}
export default Categoreis;