import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { logger } from "hono/logger";
import { z } from "zod";
import { drizzle } from "drizzle-orm/d1";
import { todosInsertSchema, todosTable } from "@/db/schema";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use(logger());

const route = app
  .get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(todosTable).all();
    return c.json(result);
  })
  .post("/", zValidator("json", todosInsertSchema), async (c) => {
    const db = drizzle(c.env.DB);
    const values = c.req.valid("json");
    const result = await db
      .insert(todosTable)
      .values(values)
      .returning()
      .then((rows) => rows[0]);
    return c.json(result);
  });

export type AppType = typeof route;
export const onRequest = handle(app);
