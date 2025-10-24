import { Card } from "@/components/ui/card";
import { cartItemWithProduct } from "../types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  DecreamentCartItemQuantity,
  DeleteCartItem,
  IncrementCartItemQuantity,
} from "../lib/actions";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "../context/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const CartItem = ({
  CartID,
  CartItem,
}: {
  CartItem: cartItemWithProduct;
  CartID: string;
}) => {
  const [loading, setLoading] = useState(false);

  const { refreshCart } = useCart();
  const formatter=new Intl.NumberFormat('en-us')

  

  const handleIncrement = async (item: cartItemWithProduct) => {
    await IncrementCartItemQuantity(item);
  };
  const handleDecreament = async (item: cartItemWithProduct) => {
    await DecreamentCartItemQuantity(item);
  };

  const handleOperations = async (
    /* eslint-disable  */

    updateValues: (item: cartItemWithProduct) => Promise<void>,
    item: cartItemWithProduct
  ) => {
    if (loading) return;
    setLoading(true);
    try {
      await updateValues(item);
      refreshCart(CartID);
    } catch {
      console.log;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card key={CartItem.id} className=" grid  grid-cols-2 md:min-w-lg max-md:w-sm max-sm:w-2xs p-1 h-2/3 max-md:grid-cols-1  ">
      <Image
        className="max-h-40 max-md:max-h-full  bg-blue-600  justify-self-center w-full max-md:object-contain object-cover rounded-lg "
        src={CartItem.product.src}
        height={200}
        width={200}
        alt={CartItem.product.name}
      ></Image>
      <div className="font-semibold grid">
        <h4>{CartItem.product.name}</h4>
        <h4>{formatter.format(CartItem.product.price)} $</h4>
        <div className="w-11/12 grid gap-1 ">
          <div className="flex gap-2  items-center w-full  ">
        
           <Button 
           className={`grow ${CartItem.quantity==1&& "pointer-events-none opacity-40"}`}
              onClick={() => handleOperations(handleDecreament, CartItem)}
              variant={"outline"}
            >
              <Minus />
            </Button>
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <Label className={`flex justify-center items-center select-none`}>
              {CartItem.quantity}
            </Label>
          )}

          <Button
            className={`cursor-pointer grow ${
              CartItem.quantity >= CartItem.product.stock &&
              "opacity-40  pointer-events-none"
            }`}
            onClick={() => handleOperations(handleIncrement, CartItem)}
            variant={"outline"}
          >
            <Plus />
          </Button>

        </div>
        <div className="grid h-full  grid-cols-2 gap-1 ">
          <Button className="" onClick={()=>handleOperations(DeleteCartItem,CartItem)} variant={"outline"}>
              <Trash2 />
            </Button>
          <Button  className="text-white">
            Buy
          </Button>
        </div>
        </div>
      </div>
    </Card>
  );
};
export default CartItem;
