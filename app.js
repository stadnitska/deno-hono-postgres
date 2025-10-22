import { Hono } from "https://deno.land/x/hono@v3.3.4/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.7/mod.js";

const sql = postgres({
  host: Deno.env.get("PGHOST"),
  port: Number(Deno.env.get("PGPORT")),
  database: Deno.env.get("PGDATABASE"),
  username: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  ssl: { rejectUnauthorized: false },
  max: 2,
  max_lifetime: 10,
});

const app = new Hono();

app.get("/", (c) =>
  c.text("Hello! Use POST / with JSON body { query: 'SELECT 1 + 1 AS sum' }")
);

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.query) return c.json({ error: "Missing query" });

    const result = await sql.unsafe(body.query);
    return c.json({ result }); // правильный формат {"result":[...]}
  } catch (e) {
    return c.json({ error: e.message });
  }
});

Deno.serve({ port: 8080 }, app.fetch);
export default app;

