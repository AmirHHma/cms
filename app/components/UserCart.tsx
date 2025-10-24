import { Card } from "@/components/ui/card";
import {  ShoppingCart,  } from "lucide-react";
import Link from "next/link";
import {  CartWithItem, localUser } from "../types/types";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";

const UserCart = ({
  user,
  cart,
}: {
  user: localUser;
  cart: CartWithItem | null;
}) => {
  const formatter=new Intl.NumberFormat('en-us')
  const { cartItems, refreshCart } = useCart();
  const [items, setItems] = useState(cart?.items);

  useEffect(() => {
    if (cartItems) {
      setItems(cartItems);
    }
    console.log(items,'soola');
  }, [cartItems]);

  useEffect(() => {
    refreshCart(user.cartID);
  }, []);
  let TotalPrice=null
  if(items){
   TotalPrice= formatter.format(items.reduce((sum,num)=>sum+(num.product.price*num.quantity),0))
  }
  



  return (
    <>
      <div className="">
        <Link className="peer overflow-visible" href={"/user/cart"}>
          <ShoppingCart className=" hover:bg-red-200 size-10 p-2  rounded-full overflow-visible relative"></ShoppingCart>
        </Link>

        <div className="group relative hover:block  hidden  peer-hover:block">
          <Card className="    max-h-96  gap-2   absolute max-sm:-right-1   right-3 overflow-y-scroll no-scrollbar p-1">
            {items &&
              items.map((item) => <CartItem  key={item.id} CartID={user.cartID} CartItem ={item}/>)
              }
              {/* <div className="min-w-lg  h-20 bg-red-400"></div> */}
          {items&&
          <div className="flex items-center  gap-5 py-2 ">

            <h3 className="font-bold">Total: {TotalPrice}$</h3>
            <Button className="text-white grow">Order</Button>
          </div> 
          }
          
          </Card>
        </div>
      </div>
    </>
  );
};
export default UserCart;


