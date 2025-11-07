import type { D1Database } from "@cloudflare/workers-types";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export const runtime = "edge";

export async function POST(req: Request, env: { usuarios: D1Database }) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });

  try {
    await createUser(email, password, env);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Usuario ya existe" }, { status: 409 });
  }
}
