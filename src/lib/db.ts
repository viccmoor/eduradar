import { D1Database } from "@cloudflare/workers-types";

export async function getUser(email: string, env: { usuarios: D1Database }) {
  return await env.usuarios
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first();
}

export async function createUser(email: string, password: string, env: { usuarios: D1Database }) {
  await env.usuarios
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .bind(email, password)
    .run();
}
