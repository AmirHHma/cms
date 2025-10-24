import { Prisma, Product } from "../generated/prisma"

export interface localUser{
  name:string,
  username:string,
  role:string,
  id:string,
  cartID:string
}



export type proudctResult={sucess:boolean}&Product


export type CartWithItem=Prisma.CartGetPayload<{include:{items:{include:{product:true}}}}>

export type cartItemWithProduct=Prisma.CartItemGetPayload<{include:{product:true}}>