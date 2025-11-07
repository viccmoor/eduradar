export async function getUser(email: string, env: any) {
  return await env.usuarios
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first();
}

export async function createUser(email: string, password: string, env: any) {
  await env.usuarios
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .bind(email, password)
    .run();
}
