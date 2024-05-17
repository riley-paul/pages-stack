import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { v4 as uuid } from "uuid";

export const todosTable = sqliteTable("todos", {
  id: text("id").primaryKey().$defaultFn(uuid),
  text: text("text", { length: 256 }).notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Todo = typeof todosTable.$inferSelect;
export const todoSchema = createSelectSchema(todosTable);
export const todosInsertSchema = createInsertSchema(todosTable);
