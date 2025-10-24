import { NextRequest, NextResponse } from "next/server";
import { User } from "./app/generated/prisma";
import { jwtVerify } from "jose";


export async function middleware(req: NextRequest) {
  // let {setUser,user}=useUser()
  
  const token = req.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.AUTH_KEY);
  const url = new URL(req.url);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  try {
    if (!secret) {
      throw new Error("Missing AUTH_KEY");
    }

    // ✅ Synchronous verify
    const {payload}:{payload:User} = await jwtVerify(token,secret)

    // ✅ Role-based check
    if (url.pathname.startsWith("/dashboard") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
    // setUser(payload)
    // console.log(user);

    return NextResponse.next(); // ✅ Always return
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
