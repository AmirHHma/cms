'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Category, Product } from "../generated/prisma";
import { addProduct } from "../(private)/dashboard/products/dashboard-products-actions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "../components/UploadImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

 const ProductDetailView = ({product}:{product:Product|null}) => {
     const [imageDta,setImageDta]=useState<{path:string,url:string}|null>(null)
    useEffect(()=>{
        if(imageDta){

        }
    },[imageDta])

   let [msg,formAction,pending]= useActionState<{data:Product|null,error:Record<string,string>|null,success:boolean},FormData>(addProduct,{data:product,error:null,success:false})

   useEffect(()=>{

    if(msg.success==true){
        toast.success('product added successfully')
    }
  
   },[msg])
   function handleSubmit(formData:FormData){
    if(imageDta){
        formData.append('img',imageDta.url)
    }
    return(formAction(formData))

   }
  
 return ( <form action={handleSubmit}   className="flex justify-center mt-10 px-10 ">
     <Card className="max-w-5xl grow">
    <CardHeader>
        <CardTitle className="flex items-center justify-between">
            Product Title <div className="flex items-center"><Star className="fill-yellow-500"/> 4.5</div>
        </CardTitle>
    </CardHeader>
    <CardContent className="grid lg:grid-cols-2 lg:gap-8 transition-all duration-300">
        <div className="hover:col-span-2 peer ">
            

        
<Image  className="h-full w-full object-cover  hover:col-span-2 rounded-lg" width={1000} height={1000} src={imageDta?.url || product?.src || '/no-image.webp'} alt={product?.name||'no image'} />
        </div>
        <div className="flex gap-4 flex-col peer-hover:hidden [&_*_p]:text-red-500 [&>p]:text-red-500"> 
            <Input type="hidden" value={product?.id}/>
            <Label htmlFor="name">Name:</Label>
            <Input type="text" name="name" defaultValue={msg.data?.name} id="name"/>
            <p>{msg.error?.name }</p>
            <Label htmlFor="desc">Description:</Label>
            <Textarea name="description" defaultValue={msg.data?.description || ''} id="desc"/>
            <p>{msg.error?.description  }</p>

            <div className="flex gap-4 max-sm:block">
                <Label htmlFor="price">Price:</Label>
            <Input name="price" type="number" id="price" defaultValue={msg.data?.price}/>

            <Label>available:</Label>
            <Input name="stock" type="number" defaultValue={msg.data?.stock}/>

            </div>
           <div className="grid grid-cols-2">
             <p className="col-span-1">{msg.error?.price  }</p>
            <p>{msg.error?.stock}</p>
           </div>
            <div className="flex gap-4">
            <Select  name="category" defaultValue={msg.data?.category}>
                <Label htmlFor="category">Category:</Label>
                <div>
                    <SelectTrigger  id="category">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
             <SelectContent> 
                <SelectGroup>
                    <SelectLabel>Catogories:</SelectLabel>
                      
                    {Object.values(Category).map((item,index)=><SelectItem defaultChecked={item==msg.data?.category} key={index} value={item}>{item}</SelectItem>)}
                </SelectGroup>
             </SelectContent>
            <p>{msg.error?.category  }</p>
                </div>
            </Select>

            </div>
            <UploadImage id={product?.id || crypto.randomUUID()} setImageDta={setImageDta}/>
           <div className="flex justify-between px-4 *:px-9">
            <Button className="cursor-grab bg-green-500q" variant={'outline'} asChild><Link href={'/dashboard'}>Cancel</Link></Button>
            <Button type="submit" disabled={pending}>{product ? 'Update':'submit'}</Button>
           </div>
            
        </div>
    </CardContent>
 </Card> 
 </form>);
}
export default ProductDetailView;