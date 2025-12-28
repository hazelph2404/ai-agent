"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import GeneratedAvatar from "@/components/generated-avatar";

import { agentsInsertSchema } from "../../schemas";
import type { AgentGetOne } from "../../types";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type FormValues = z.infer<typeof agentsInsertSchema>;

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
  variant?: "dialog" | "page";
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
  variant = "page",
}: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const isEdit = !!initialValues?.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
    mode: "onChange",
  });

  const name = form.watch("name");

  const createAgent = useMutation(
    trpc.agent.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agent.getMany.queryOptions());
        onSuccess?.();
        form.reset({ name: "", instructions: "" });
      },
      onError: (error) => {
        toast.error(error.message);
        // handled by createAgent.isError UI below
      },
    })
  );

  const isPending = createAgent.isPending;

  const onSubmit = (values: FormValues) => {
    if (isEdit) {
      // if you add update later, swap this
      console.log("TODO: update Agent", values);
      return;
    }
    else{
    createAgent.mutate(values);
    }
  };

  return (
    <div className={variant === "page" ? "rounded-xl border p-6" : ""}>
      {variant === "page" ? (
        <>
          <div className="mb-1 text-lg font-semibold">
            {isEdit ? "Edit agent" : "Create a new agent"}
          </div>
          <div className="mb-6 text-sm text-muted-foreground">
            Give your agent a clear name and instructions so it behaves consistently in meetings.
          </div>
        </>
      ) : null}

      {variant === "page" ? <Separator className="mb-6" /> : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <GeneratedAvatar
            seed={form.watch("name")}
            className="size-16 rounded-full overflow-hidden border"
            />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Meeting Notes Assistant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what this agent should do in meetings. Tone, priorities, what to extract, what to avoid..."
                    className="min-h-[140px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            { onCancel && (<Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
              Cancel
            </Button>)}
            <Button type="submit" disabled={isPending || !form.formState.isValid}>
              {isPending ? "Saving..." : isEdit ? "Save changes" : "Create agent"}
            </Button>
          </div>

          {createAgent.isError ? (
            <p className="text-sm text-destructive">Failed to create agent. Try again.</p>
          ) : null}
        </form>
      </Form>
    </div>
  );
};

