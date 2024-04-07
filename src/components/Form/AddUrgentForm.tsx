import { UrgencyRead } from "@/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { UrgentReqBody } from "@/pages/Urgent/interface/Urgent";

interface AddUrgentFormProps {
  urgencies: UrgencyRead[];
  handleAddUrgent: (values: UrgentReqBody) => void;
}

const formSchema = z.object({
  urgentName: z.string().min(2, {
    message: "Must be atleast 2 characters.",
  }),
  urgencyId: z
    .string()
    .min(1, { message: "Select Severity" })
    .refine((value) => {
      return value !== "Select Severity";
    }),
});

const AddUrgentForm: React.FC<AddUrgentFormProps> = ({
  urgencies,
  handleAddUrgent,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urgentName: "",
      urgencyId: "",
    },
  });

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    const urgentReq = {
      urgentName: values.urgentName,
      urgencyId: parseInt(values.urgencyId),
    };
    handleAddUrgent(urgentReq);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="pt-4 flex gap-2 mb-2"
      >
        <FormField
          control={form.control}
          name="urgentName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  spellCheck
                  placeholder="Urgent Symptom..."
                  {...field}
                  className="w-[500px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urgencyId"
          render={({ field }) => (
            <FormItem>
              <Select
                key={field.value}
                onValueChange={field.onChange}
                defaultValue={field?.value}
              >
                <FormControl>
                  <SelectTrigger className="mr-4">
                    <SelectValue placeholder="Select Severity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {urgencies?.map((urgency, index) => (
                    <SelectItem
                      key={index}
                      value={urgency.urgencyId.toString()}
                    >
                      {urgency.urgencyDetail}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <FaPlus />
        </Button>
      </form>
    </Form>
  );
};

export default AddUrgentForm;
