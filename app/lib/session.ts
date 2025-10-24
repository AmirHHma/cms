'use server'
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "./prisma";
import { User } from "../generated/prisma";

export async function getUserInformation(): Promise<User | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const secret = new TextEncoder().encode(process.env.AUTH_KEY);
  if (!secret) return null;

  try {
    const {payload} :{payload:User}=await jwtVerify(token, secret) ;
    console.log(payload);
    
    const user = await prisma.user.findUnique({
      where: { id: payload.id},
    });

    return user; 
  } catch {
    return null;
  }
}