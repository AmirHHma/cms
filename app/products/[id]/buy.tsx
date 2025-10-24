'use client'
import { Product } from "@/app/generated/prisma";
import { localUser } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { AddToCartAction } from "../action";
import { useCart } from "@/app/context/CartContext";

 const Buy = ({product,user}:{product:Product,user:localUser}) => {
  const {refreshCart}=useCart()
     const formatter=new Intl.NumberFormat('en-us')

    const AddToCart=async()=>{

      const result= await AddToCartAction(product.id,user)
     if(result.success){
    }
    refreshCart(user.cartID)
        
    }
 return ( 
    <div className="dark:bg-zinc-800 p-3 rounded-lg bg-zinc-100 flex  flex-col ">
        <h3 className="text-4xl font-semibold ">{formatter.format(product.price)} $</h3>
       <div className="grow flex flex-col justify-end" >
         <h5 className=" text-center text-sm animate-pulse mt-3">only {product.stock } remaining</h5>
        <Button onClick={AddToCart} className="max-md:bg-green-600 p-8 text-2xl w-full cursor-pointer">Add To Cart</Button>
       </div>
    </div>
);
}
export default Buy;