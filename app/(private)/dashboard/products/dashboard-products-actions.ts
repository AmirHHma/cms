'use server'
import { Product } from "@/app/generated/prisma";
import prisma from "@/app/lib/prisma";
import { productSchema } from "@/app/schema/zod/zod";
import { revalidatePath } from "next/cache";

export async function addProduct(prev:{data:Product | null ,error:Record<string,string>|null , success:boolean},   formData:FormData | null):Promise<{data:Product | null ,error:Record<string,string>|null , success:boolean}>{


let image=formData?.get('img') as string;
let id=formData?.get('id') as string;
    let newProduct={
        name:formData?.get('name'),
        description:formData?.get('description'),
        price:Number(formData?.get('price')),
        stock:Number(formData?.get('stock') ),
        category:formData?.get('category'),
    } as unknown as Product ;
    if(image){
        newProduct.src=image
    }

   let product= productSchema.safeParse(newProduct)


    if(!product.success){
        const errMsg:Record<string,string>={}
        product.error.issues.forEach(err=>{
            let field=err.path[0].toString() || 'form'
            errMsg[field]=err.message
        })
        return {data:newProduct,error:errMsg,success:false}
    }
    try{
        if(id){
            await prisma.product.update({where:{id},data:newProduct})
            
        }else{
            await prisma.product.create({data:newProduct})
    }
    }catch{
        return {data:newProduct,error:{msg:'failed to add product!'},success:false}
    }


        
    revalidatePath('/products')
    return {data:newProduct,error:null,success:true}

}

export  const getProducts=async(quantity:number,currPage:number)=>{
    const skip=(currPage-1)*quantity
    const [Products,count]=await Promise.all([
        await prisma.product.findMany({skip:skip,take:quantity}),await prisma.product.count()
    ])
   return {Products,count}
}

export const getSpecificProduct=async(id:string)=>{
    try{
        let product=await prisma.product.findUnique({where:{id}})
        return product
    }catch{
        return null
    }
}