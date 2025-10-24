"use server"
import { CartItem, Category } from "../generated/prisma"
import { IncrementCartItemQuantity } from "../lib/actions"
import prisma from "../lib/prisma"
import { localUser } from "../types/types"
import { Filter } from "./page"

const Criteria=5


export const GetInitialProducts=async(filter:Filter)=>{
  const inCategory=Object.values(Category).includes(filter.category as Category) ? (filter.category as Category) : undefined


    try{
        let products=await prisma.product.findMany({
            where:{
                AND:[
                    filter.max ? {price:{gte:parseInt(filter.min),lte:parseInt(filter.max)}}:{},
                    filter.category ? {category:inCategory}:{},
                    filter.search ? {name:{contains:filter.search,mode:"insensitive"}}:{}
                ]
            },take:Criteria*2,
            orderBy:{id:"asc"}
        })
        return products
    }catch{console.error}

}





export const GetProductsLazily=async(page:number,filter:Filter)=>{
     const inCategory=Object.values(Category).includes(filter.category as Category) ? (filter.category as Category) : undefined
    try{
        const Products=await prisma.product.findMany({
            where:{
                AND:[
                    filter.max ? {price:{gte:parseInt(filter.min),lte:parseInt(filter.max)}}:{},
                    filter.category ? {category:inCategory}:{},
                    filter.search ? {name:{contains:filter.search,mode:"insensitive"}}:{}
                ]
            },skip:((page-1)*Criteria)+Criteria,
            take:Criteria,

            orderBy:{id:'asc'}
                
            
            
        })
        return Products
    }catch{console.error}
}



export const GetMostExpensiveWithFilters=async(filter:{search:string,category:Category})=>{
     const inCategory=Object.values(Category).includes(filter.category as Category) ? (filter.category as Category) : undefined


    try{
        let product=await prisma.product.findFirst({
            where:{
                AND:[
                    filter.category ? {category:inCategory}:{},
                    filter.search ? {name:{contains:filter.search,mode:"insensitive"}}:{}
                ]
            },
            orderBy:{price:"desc"}
        })
        return product?.price
    }catch{console.error}


}



export const GetProductDetail=async(id:string)=>{

    try{
        const Product=await prisma.product.findFirst({
            where:{id}
        })
        return Product
    }catch{console.error}

}


export const AddToCartAction=async(ProductID:string,user:localUser):Promise<{cartItem:CartItem|null,success:boolean}>=>{
    try{
        const productExists=await prisma.cartItem.findFirst({where:{productID:ProductID},include:{product:true}})
        console.log(productExists);
        if(productExists){
            IncrementCartItemQuantity(productExists)
        }else{
             let cartItem=await prisma.cartItem.create({
        data:{
            cartID:user.cartID,
            productID:ProductID
        }
    })
return {cartItem,success:true}
        }
        return {cartItem:null,success:false}

       
    }catch{
return {cartItem:null,success:false}
    }
}