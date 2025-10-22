<<<<<<< HEAD
import { Hono } from "hono";
import { Client } from "postgres";
=======
import { Hono } from "https://deno.land/x/hono@v3.11.10/mod.js";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.js";
>>>>>>> 7c4ee5c (trigger redeploy)

const app = new Hono();

const client = new Client({
  hostname: Deno.env.get("PGHOST"),
<<<<<<< HEAD
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  database: Deno.env.get("PGDATABASE"),
  port: Number(Deno.env.get("PGPORT")),
  ssl: true,
});

await client.connect();
=======
  port: Deno.env.get("PGPORT"),
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  database: Deno.env.get("PGDATABASE"),
});
>>>>>>> 7c4ee5c (trigger redeploy)

app.post("/", async (c) => {
  const body = await c.req.json();
  const query = body.query;
  try {
<<<<<<< HEAD
    const { query } = await c.req.json();
    const result = await client.queryObject(query);
    return c.json(result.rows);
  } catch (err) {
    return c.json({ error: err.message }, 500);
=======
    await client.connect();
    const result = await client.queryObject(query);
    await client.end();
    return c.json({ result: result.rows });
  } catch (error) {
    return c.json({ error: error.message });
>>>>>>> 7c4ee5c (trigger redeploy)
  }
});

export default app;
