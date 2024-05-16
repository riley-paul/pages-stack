import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { todosTable, todosInsertSchema } from "../db/schema";

const app = new Hono<{ Bindings: Bindings }>()
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

export default app;
