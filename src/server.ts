
import http from "node:http";
import Koa from "koa";

export function createServer(): http.Server {
  const app = new Koa();
  app.use(async (context, next) => {
    if (context.method === "GET" && context.path === "/health") {
      context.body = { status: "ok" };
      return;
    }
    await next();
  });
  return http.createServer(app.callback());
}

if (process.argv[1]?.endsWith("/server.js")) {
  const port = Number.parseInt(process.env.PORT ?? "8080", 10);
  createServer().listen(port, "0.0.0.0");
}
