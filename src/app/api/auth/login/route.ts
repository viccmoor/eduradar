import { NextResponse } from "next/server";
import { D1Database } from "@cloudflare/workers-types";
import { getUser } from "@/lib/db";
import { SignJWT } from "jose";

export const runtime = "edge";

export async function POST(req: Request, context: { env: { usuarios: D1Database } }) {
  const { env } = context;
  const { email, password } = await req.json();
  const user = await getUser(email, env);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });
  return res;
}
