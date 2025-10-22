import { Hono } from "@hono/hono";
import postgres from "postgres";

const sql = postgres({
  host: "database.cs.aalto.fi",
  port: 54321,
  database: "dbbf1685efb6024e",
  username: "dbbf1685efb6024e",
  password: "dbe4ebd6a8cbd347",
  max: 2, // ✅ максимум 2 соединения
  max_lifetime: 10, // ✅ каждое живёт 10 сек
});

const app = new Hono();

app.post("/*", async (c) => {
  try {
    const body = await c.req.json();
    const result = await sql.unsafe(body.query);
    return c.json({ result });
  } catch (err) {
    return c.json({ error: err.message });
  }
});

app.get("/*", (c) =>
  c.html(`
    <html>
      <head><title>Database Demo</title></head>
      <body>
        <h1>Hello!</h1>
        <p>Try POSTing JSON {"query":"SELECT 1+1 AS sum"}</p>
      </body>
    </html>
  `)
);

Deno.serve(app.fetch);
