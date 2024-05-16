import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { logger } from "hono/logger";

import todosRoutes from "@/api/routes/todos";

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use(logger());

const routes = app.route("/todos", todosRoutes);

export type AppType = typeof routes;
export const onRequest = handle(app);
