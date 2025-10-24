import prisma from "@/app/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(){
    let token=(await cookies()).get('token')?.value
    if(!token){
        return NextResponse.json({user:null})
    }
    const secret=new TextEncoder().encode(process.env.AUTH_KEY)
    
    try{
        let {payload}=await jwtVerify(token,secret);
        let user=await prisma.user.findUnique({where:{id:payload.id as string}})
        return NextResponse.json({user})
    }catch{
        return NextResponse.json({user:null})
    }
}