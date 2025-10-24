'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
} from "lucide-react";
import React, {  useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "../products/page";


const Filtering = ({filters,mostExpensive}:{filters:Filter,mostExpensive:number}) => {
  const [price, setPrice] = useState<number[]>([parseInt(filters.min), parseInt(filters.max)]); 
  const formatter= new Intl.NumberFormat('en-US')
  const [tempPrice, setTempPrice] = useState(price);
  const searchParams=useSearchParams()
  const params=new URLSearchParams(searchParams.toString())
  const router=useRouter()

  useEffect(()=>{
    

    params.set('min',String(tempPrice[0]))
    params.set('max',String(tempPrice[1]))
    router.push(`/products?${params}`)

  },[price])



  
  return (
    <div className="bg-neutral-100 p-5 rounded-xl dark:bg-neutral-900">
      <div className="">
        <Label className="text-lg" htmlFor="meo">
          Price<ChevronDown></ChevronDown>
        </Label>
        <Input hidden defaultChecked className="peer" id="meo" type="checkbox" />
        <div className="max-h-0  overflow-hidden transition-[max-height] duration-300 peer-checked:max-h-28  ">
          <div className="flex items-center gap-2">
            <h1 className=" ">from</h1>
            <input
              className=" max-w-3xs min-w-10 focus:outline-none border-b border-neutral-400 px-2 py-1"
              type="text"
              defaultValue={formatter.format(tempPrice[0])+' $'}
            />
          </div>

          <div className="flex items-center gap-2 ">
            <h1 >Up to</h1>
            <input
              className=" max-w-3xs min-w-10  focus:outline-none border-b border-neutral-400 px-2 py-1"
              type="text"
              defaultValue={formatter.format(tempPrice[1])+' $'}
            />
          </div>
          <Slider 
            value={tempPrice}
            defaultValue={price}
            onValueChange={setTempPrice}
            onValueCommit={setPrice}
            min={0}
            max={mostExpensive}
            step={10}
            className="w-full p-3"
          />
        </div>
      </div>
    </div>
  );
};
export default Filtering;
