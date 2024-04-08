import { Control } from "react-hook-form";

export interface AddChoiceFormProps {
  nestIndex: number;
  control: Control<
    {
      activeQuestionSet: string;
      stages: {
        options: {
          optionName: string;
          optionSummary?: string | undefined;
        }[];
        questionName: string;
        questionType: string;
        image?: any;
      }[];
    },
    any
  >;
}
