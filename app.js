import { Hono } from "@hono/hono";
import postgres from "postgres";

const app = new Hono();

app.get("/", (c) =>
  c.html(`
    <html>
      <head><title>Postgres Demo</title></head>
      <body>
        <h1>Hello, Deno + PostgreSQL!</h1>
        <p>Send a POST request with {"query": "SELECT 1 + 1 AS sum"}</p>
      </body>
    </html>
  `)
);

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.query) return c.json({ error: "Missing query" });

    // ✅ создаём подключение внутри запроса
    const sql = postgres({
      host: "database.cs.aalto.fi",
      port: 54321,
      database: "dbbf1685efb6024e",
      username: "dbbf1685efb6024e",
      password: "dbe4ebd6a8cbd347",
      ssl: true,
    });

    const result = await sql.unsafe(body.qu
