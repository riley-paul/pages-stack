import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./lib/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { todosQueryOptions } from "./lib/queries";

const App = () => {
  const query = useQuery(todosQueryOptions);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await client.api.$post({ json: { text } });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryOptions.queryKey });
    },
  });

  const [value, setValue] = React.useState("");

  return (
    <main className="mt-12">
      <Card className="container2">
        <CardHeader>
          <CardTitle>Todo App</CardTitle>
          <CardDescription>Deployed to the edge</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate(value);
              setValue("");
            }}
          >
            <Input
              placeholder="Add todo"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </form>
        </CardContent>
        <CardContent>
          {query.isLoading ? (
            <p>Loading...</p>
          ) : query.isError ? (
            <p>Error: {query.error.message}</p>
          ) : (
            <ul>
              {query.data?.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default App;
