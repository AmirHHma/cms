"use server";

import prisma from "./prisma";
import bcrypt from "bcrypt";
import {  User } from "../generated/prisma";
import { zodSchema } from "../schema/zod/zod";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { cartItemWithProduct } from "../types/types";
export async function signUser(
  prevState: { data: User | null; errors: Record<string, string> | null },
  formDta: FormData
): Promise<{ data: User | null; errors: Record<string, string> | null }> {
  // guarantee input validations

  const parsed = zodSchema.safeParse({
    name: formDta.get("name"),
    username: formDta.get("username"),
    email: formDta.get("email"),
    password: formDta.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString() || "form";
      fieldErrors[field] = issue.message;
    });
    return { data: null, errors: fieldErrors };
  }
  // const baseUrl =process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  parsed.data.password = await bcrypt.hash(parsed.data.password, 10);

  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_KEY);

  if (!secret) {
    return { data: null, errors: { msg: "no secrets provided" } };
  }
  try {
  } catch (err) {
    // @ts-expect-error  I don't remember to be honest
    return { data: null, errors: { msg: err } };
  }
  let user=await prisma.user.create({ data: {
    ...parsed.data,
    cart:{create:{}}
    
  },include:{cart:true}});

  const token = await new SignJWT({
    name: user.name,
    username:user.username,
    id: user.id,
    cartID:user.cart?.id,
    role:"USER"
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
  const cookieStore = await cookies();
  cookieStore.set("token", token);
  revalidatePath("/");
  // redirect("/");

  return { data: parsed.data as User, errors: null };
}

export async function loginUser(
  prevState: { data: User | null; error: Record<string, string> | null },
  formData: FormData
): Promise<{ data: User | null; error: Record<string, string> | null }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  let user = null;
  try {
    user = await prisma.user.findUnique({ where: { username },include:{cart:true} });
    if (!user) {
      return { data: null, error: { username: "User not found" } };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return { data: null, error: { password: "Invalid password" } };
    }
    let secret = new TextEncoder().encode(process.env.AUTH_KEY);
    if (secret) {
      const token = await new SignJWT({ id: user.id, role: user.role,username:user.username ,cartID:user.cart?.id})
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secret);

      const cookieStore = await cookies();
      cookieStore.set("token", token);
      revalidatePath("http://localhost:3000/");
    }
  } catch (err) {
    let a = err as unknown as string;

    return { data: null, error: { msg: a } };
  }

  return { data: user, error: null };
}

export async function LogOutUser() {
  let cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");

  return true;
}

export async function UploadImageAction(formData: FormData) {
  let file = formData.get("file") as File;
  let id = formData.get("id") as string;
  const fileName = `${file.name}-${id}`;
  const { error } = await supabase.storage.from("cms").upload(fileName, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: PublicUrl } = supabase.storage
    .from("cms")
    .getPublicUrl(fileName);
  return { path: fileName, url: PublicUrl.publicUrl };
}

export const AuthUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const secret=new TextEncoder().encode(process.env.AUTH_KEY)
  if(!secret){
    throw new Error('missing Auth Key')
  }

try{

  if (token) {
    const User=await jwtVerify(token,secret)
    return User.payload
  }
}catch{
  return null

}
};


export const GetCartItems=async(CartID:string)=>{
  try{
    let CartItems=await prisma.cart.findFirst({
    where:{
      id:CartID
    },include:{items:{
      include:{
        product:true
      },orderBy:{id:"asc"}
    }}
  })
  return CartItems
  }catch{
    console.error('no cart found!!')
    return null
  }


}


export const IncrementCartItemQuantity=async(item:cartItemWithProduct,amount:number=1)=>{
  
  try{
    if(item.quantity<item.product.stock){
      await prisma.cartItem.update({
      where:{id:item.id},
      data:{quantity:{increment:amount}}
    }
  )
    }else{
      return {err:'not successful'}
    }

  }catch{console.warn}
  
}

export const DecreamentCartItemQuantity=async(item:cartItemWithProduct)=>{
  const qty=await prisma.cartItem.findFirst({where:{id:item.id}})
  console.log(qty,item.product.stock);
  if(!qty)return ({msg:'failed to find cartItem'})

  try{
    if(qty.quantity>1){
      await prisma.cartItem.update({
        where:{id:item.id},data:{quantity:{decrement:1}}
      })
    }
  }catch{console.warn}
}


export const DeleteCartItem=async(CartItem:cartItemWithProduct)=>{

  try{
    await prisma.cartItem.delete({
      where:{id:CartItem.id}
    })
  }catch{console.warn}

}