import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { SingleItemFormProps } from "./interface/Form";

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: "Mst be atleast 2 characters.",
  }),
});

export const SingleItemForm: React.FC<SingleItemFormProps> = ({
  onSubmit,
  placeholder,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
    },
  });

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.itemName);
    form.setValue("itemName", "");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="pt-4 flex gap-2 mb-2"
      >
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  spellCheck
                  placeholder={placeholder}
                  {...field}
                  className="w-[500px]"
                />
              </FormControl>
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
