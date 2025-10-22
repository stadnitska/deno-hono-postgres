import app from "./app.js";

Deno.serve({ port: 8080 }, app.fetch);
