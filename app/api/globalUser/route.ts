import { User } from "@/app/generated/prisma";
import prisma from "@/app/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import {  NextResponse } from "next/server";

export  async function GET(){

    let cookieStore=await cookies()

   let token= cookieStore.get('token')?.value
   if(!token) return NextResponse.json({msg:'no token provided'})

   let secret=new TextEncoder().encode(process.env.AUTH_KEY)
   try{
    let {payload}:{payload:User}=await jwtVerify(token,secret)
    let user=await prisma.user.findUnique({where:{id:payload.id}})

    return NextResponse.json(user)

   }catch{
    return NextResponse.json({msg:'user not verified'})
   }
}