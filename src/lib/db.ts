export async function getUser(email: string, env: any) {
  const result = await env.DB.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).bind(email).first();
  return result;
}

export async function createUser(email: string, password: string, env: any) {
  await env.DB.prepare(
    "INSERT INTO users (email, password) VALUES (?, ?)"
  ).bind(email, password).run();
}
