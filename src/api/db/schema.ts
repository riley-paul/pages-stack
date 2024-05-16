import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const todosTable = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  text: text("text", { length: 256 }).notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Todo = typeof todosTable.$inferInsert;
export const todoSchema = createSelectSchema(todosTable);
export const todosInsertSchema = createInsertSchema(todosTable);
