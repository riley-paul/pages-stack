import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { logger } from "hono/logger";
import { z } from "zod";

const app = new Hono().basePath("/api");

app.use(logger());

const route = app.get(
  "/hello",
  zValidator(
    "query",
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello fasdfasdf ${name}!`,
    });
  }
);

export type AppType = typeof route;
export default {
  port: 5000,
  fetch: app.fetch,
};
export const onRequest = handle(app);
