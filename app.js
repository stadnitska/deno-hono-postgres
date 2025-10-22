import { Hono } from "https://deno.land/x/hono/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";

const app = new Hono();

const client = new Client({
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  database: Deno.env.get("PGDATABASE"),
  hostname: Deno.env.get("PGHOST"),
  port: Number(Deno.env.get("PGPORT")),
});

app.post("/", async (c) => {
  const body = await c.req.json();
  const result = await client.queryObject(body.query);
  return c.json({ result: result.rows });
});

// 🟢 Вот эта часть важна
const port = Deno.env.get("PORT") || 3000;
console.log(`Server running on port ${port}`);
Deno.serve({ port: Number(port) }, app.fetch);
