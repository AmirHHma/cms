'use client'
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";


 const SearchProduct = () => {

    const searchParams=useSearchParams()
    const params=new URLSearchParams(searchParams.toString())
    const router=useRouter()

    let value=searchParams.get('search') || ''




    const handleKeyUp=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key=="Enter"){
            params.set('search',e.currentTarget.value)
            router.push(`/products?${params}`)
        }
    }

 return ( <div className="flex max-w-lg items-center grow group rounded-md ring-neutral-300 bg-neutral-100 dark:bg-background px-2 has-focus-visible:ring-2">
            <Search  className="cursor-pointer" />
            <Input 
            // onChange={}
            onKeyUp={handleKeyUp}
            defaultValue={value}
              className="border-none group focus-visible:ring-0 p-5 max-sm:hidden"
              placeholder="search"
            />
          </div> );
}
export default SearchProduct;