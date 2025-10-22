import app from "./app.js";

console.log("Listening on http://localhost:8080/");
Deno.serve({ port: 8080 }, app.fetch);
