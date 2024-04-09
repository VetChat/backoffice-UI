import { formSchema } from "@/pages/CreateQuestionSet/CreateQuestionSet";
import { Control } from "react-hook-form";
import { z } from "zod";

export interface AddChoiceFormProps {
  nestIndex: number;
  control: Control<z.infer<typeof formSchema>, any>;
}
