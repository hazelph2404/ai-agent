"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import CommandSelect from "@/components/command-select";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { MeetingGetOne } from "@/modules/meetings/types";
import { useState } from "react";
import GeneratedAvatar from "@/components/generated-avatar";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";

type FormValues = z.infer<typeof meetingsInsertSchema>;

interface MeetingFormProps {
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
  variant?: "dialog" | "page";
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
  variant = "page",
}: MeetingFormProps) => {
  const [openAgent, setOpenAgent] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }),
  );

  const agents = data.items;
  const agentOptions = agents.map((agent) => ({
    id: agent.id,
    value: agent.id,
    children: (
      <div className="flex items-center gap-x-2">
        {" "}
        <GeneratedAvatar
          seed={agent.name}

          className="border size-6"
        />
      </div>
    ),
  }));

  const isEdit = !!initialValues?.id;
  //initialValues exists → edit mode ; no initialValues → create mode

  const form = useForm<FormValues>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
    mode: "onChange",
  });

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (meeting) => {
        //TODO: invalidate for free tier users
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        onSuccess?.(meeting.agentId);
        form.reset({ name: "", agentId: "" });
      },
      onError: (error) => {
        toast.error(error.message);
        // handled by createAgent.isError UI below
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (meeting) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.(meeting.id);
        form.reset({ name: "", agentId: "" });
      },
      onError: (error) => {
        toast.error(error.message);
        //TODO: if error code is "FORBIDDEN", lead to /upgrade.
      },
    }),
  );

  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: FormValues) => {
    if (isEdit && initialValues?.id) {
      updateMeeting.mutate({ id: initialValues.id, ...values }); //there might be an error here?
      return;
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
    <NewAgentDialog open={openAgent} setOpenDialog={setOpenAgent} />
    <div className={variant === "page" ? "rounded-xl border p-6" : ""}>


      {variant === "page" ? <Separator className="mb-6" /> : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Meeting name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choosing Agent</FormLabel>

                <FormControl>
                  <CommandSelect
                    options={agentOptions ?? []}
                    value={field.value}
                    onSelect={(value) => field.onChange(value)}
                    onSearch={setAgentSearch}
                    placeholder="Select an agent"
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for? {" "}
                  <button type="button" className="text-primary hover:underline" onClick={() => setOpenAgent(true)}>{" "}Create a new agent </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-2 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending
                ? "Saving..."
                : isEdit
                  ? "Save changes"
                  : "Create meeting"}
            </Button>
          </div>

          {createMeeting.isError ? (
            <p className="text-sm text-destructive">
              Failed to create meeting. Try again.
            </p>
          ) : null}
        </form>
      </Form>
    </div>
    </>
  );
};
