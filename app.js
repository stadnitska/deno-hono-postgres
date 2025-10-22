import { Hono } from "@hono/hono";
import postgres from "postgres";

const BANNED_WORDS = [
  "delete", "update", "insert", "drop", "alter", "create",
  "truncate", "replace", "merge", "grant", "revoke",
  "transaction", "commit", "rollback", "savepoint", "lock",
  "execute", "call", "do", "set", "comment"
];

const query = async (query) => {
  for (const word of BANNED_WORDS) {
    if (query.toLowerCase().includes(word)) {
      throw new Error(`You cannot ${word} data`);
    }
  }

  const sql = postgres({
    host: Deno.env.get("PGHOST"),
    port: Deno.env.get("PGPORT"),
    database: Deno.env.get("PGDATABASE"),
    username: Deno.env.get("PGUSER"),
    password: Deno.env.get("PGPASSWORD"),
    max: 2,              // ✅ максимум 2 соединения
    max_lifetime: 10     // ✅ живут 10 секунд
  });

  const result = await sql.unsafe(query);
  await sql.end(); // ✅ закрываем соединение после запроса
  return result;
};

const app = new Hono();

app.get("/", (c) =>
  c.html(`
    <html>
      <head><title>Hello DB!</title></head>
      <body>
        <h1>Database connection test</h1>
        <p>Send a POST request with {"query": "SELECT 1 + 1 AS sum"}.</p>
      </body>
    </html>
  `)
);

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = await query(body.query);
    return c.json({ result });
  } catch (err) {
    return c.json({ error: err.message });
  }
});

Deno.serve(app.fetch);
