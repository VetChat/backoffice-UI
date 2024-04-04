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
import { AnimalFormProps } from "./interface/AnimalForm";

const formSchema = z.object({
  animalName: z.string().min(2, {
    message: "Animal must be atleast 2 characters.",
  }),
});

export const AnimalForm: React.FC<AnimalFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalName: "",
    },
  });

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.animalName);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="pt-4 flex gap-2 mb-2"
      >
        <FormField
          control={form.control}
          name="animalName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter Animal"
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
