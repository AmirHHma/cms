// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: "token",
    value: "meo",
    path: "/",        // required
    httpOnly: false,  // for testing in dev
    secure: false,    // must be false on localhost
    sameSite: "lax",
    maxAge: 60 * 60,
  });

  return res;
}
