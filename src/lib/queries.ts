import { queryOptions } from "@tanstack/react-query";
import { client } from "./client";

export const todosQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => {
    const res = await client.api.todos.$get();
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return res.json();
  },
});
