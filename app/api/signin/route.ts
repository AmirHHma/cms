import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const secret = process.env.AUTH_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Missing AUTH_KEY" }, { status: 500 });
  }

  const user = await prisma.user.create({ data: body });

  const token = jwt.sign({ userId: user.id }, secret);

  


return  NextResponse.json({ token, user });

}
