import { AppType } from "functions/api/[[route]]";
import { hc } from "hono/client";

export const client = hc<AppType>("/");
