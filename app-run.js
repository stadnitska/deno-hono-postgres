import app from "./app.js";

<<<<<<< HEAD
console.log("Listening on http://localhost:8080/");
Deno.serve({ port: 8080 }, app.fetch);
=======
export default app; // <--- только экспортируем, без Deno.serve
>>>>>>> 7c4ee5c (trigger redeploy)
