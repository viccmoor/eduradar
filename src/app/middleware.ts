import { jwtVerify } from "jose";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export async function middleware(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token) return new Response("No autorizado", { status: 401 });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return;
  } catch {
    return new Response("Token inválido", { status: 401 });
  }
}
