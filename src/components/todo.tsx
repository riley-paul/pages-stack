import type { Todo } from "@/api/db/schema";
import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { todosQueryOptions } from "@/lib/queries";

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = (props) => {
  const { todo } = props;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await client.api.todos[":id{[0-9]+}"].$delete({
        param: { id: todo.id.toString() },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryOptions.queryKey });
    },
  });

  return (
    <Card className="px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2">
      <Checkbox checked={todo.completed} />
      <span className="text-sm flex-1">{todo.text}</span>
      <Button
        size="sm"
        variant="link"
        className="h-auto p-0"
        onClick={() => deleteMutation.mutate()}
      >
        delete
      </Button>
    </Card>
  );
};

export default TodoItem;
