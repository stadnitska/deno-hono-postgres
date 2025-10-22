import { Hono } from "hono";
import { Client } from "postgres";

const app = new Hono();

const client = new Client({
  hostname: Deno.env.get("PGHOST"),
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  database: Deno.env.get("PGDATABASE"),
  port: Number(Deno.env.get("PGPORT")),
  ssl: true,
});

await client.connect();

app.post("/", async (c) => {
  try {
    const { query } = await c.req.json();
    const result = await client.queryObject(query);
    return c.json(result.rows);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

export default app;
