import { Card } from "@/components/ui/card";
import { GetProductDetail } from "../action";
import Image from "next/image";
import Buy from "./buy";
import { Star } from "lucide-react";
import { AuthUser } from "@/app/lib/actions";
import SameCategory from "./sameCategory";

const productDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
   const user:any=await AuthUser()


  const product = await GetProductDetail(id);

    return (
      <div>
        <div className="flex w-screen items-center flex-col mt-20 ">
          {
            product && <Card className="grid md:grid-cols-[2.5fr_2fr_1.5fr] max-w-7xl grow px-3 max-h-[500]">
            <Image
              className="h-full overflow-hidden object-cover rounded-lg" 
              // style={{aspectRatio:'1/1',width:20}}
              src={product.src}
              height={400}
              width={400}
              alt={product.name}

            />

            {/* details */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-center font-semibold text-2xl uppercase ">
                  {product?.name}
                </h3>
                <h3 className="flex justify-center gap-1 ">
                  {product.rating}
                  <Star className="fill-yellow-300"></Star>
                </h3>
              </div>
              <h3 className="mt-5 first-letter:uppercase">
                {product.description}
              </h3>
            </div>
            <Buy product={product} user={user}/>
          </Card>
          }
          
        </div>
        <SameCategory/>
      </div>
    );
  }
export default productDetail;
