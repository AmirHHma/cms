import Brands from "@/app/components/Brands";
import Offers from "./components/Offers";
import Categoreis from "./components/Categories";
import Footer from "@/components/Footer";
import MostSaledProducts from "./components/mostSaledProducts";

 const Page = () => {
 return (
    <main className="mt-10">

 <Brands/>
 <div className="lg:px-20 sm:px-10 px-3">
   <Offers/>
   <Categoreis/>
   <MostSaledProducts/>
 </div>
   <Footer/>
    </main>

 );
}
export default Page;