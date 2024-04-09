import { useFieldArray } from "react-hook-form";
import { AddChoiceFormProps } from "./interface/QuestionSetForm";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { z } from "zod";
import { formSchema } from "@/pages/CreateQuestionSet/CreateQuestionSet";
import { Select } from "@mantine/core";

const AddChoiceForm: React.FC<AddChoiceFormProps> = ({
  nestIndex,
  control,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `stages.${nestIndex}.listAnswer`,
  });

  const [skipOptions, setSkipOptions] = useState<string[]>([]);

  useEffect(() => {
    const formValue: z.infer<typeof formSchema> =
      control._formValues as z.infer<typeof formSchema>;

    const indexes: string[] = formValue.stages.map((_, index) =>
      (index + 1).toString()
    );

    const options = indexes.filter((index) => parseInt(index) > nestIndex + 2);

    setSkipOptions(options);
  }, [control]);

  const handleAddOption = () => {
    append({
      answer: "",
      summary: "",
      skipToQuestion: null,
    });
  };

  const handleRemoveOption = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold pb-2">Answers</h2>
      </div>
      {fields.map((item, key) => {
        return (
          <div key={item.id}>
            <div className="flex items-center gap-3 pb-2">
              <div className="flex border rounded-2xl bg-[#F5F5F7] w-10 h-10 items-center justify-center ">
                <div className="text-lg font-semibold">{key + 1}</div>
              </div>
              <FormField
                control={control}
                name={`stages.${nestIndex}.listAnswer.${key}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        spellCheck
                        placeholder="Option..."
                        {...field}
                        className="w-[300px] rounded-2xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`stages.${nestIndex}.listAnswer.${key}.summary`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        spellCheck
                        placeholder="Summary... (Optional)"
                        {...field}
                        value={field.value || ""}
                        className="rounded-2xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`stages.${nestIndex}.listAnswer.${key}.skipToQuestion`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        key={key}
                        className="rounded-2xl w-[200px]"
                        data={skipOptions}
                        onChange={(value) => {
                          if (!value) {
                            field.onChange(null);
                            return;
                          }
                          field.onChange(parseInt(value));
                        }}
                        placeholder="Skip to question"
                        clearable
                        radius={"lg"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {key > 0 && (
                <Button
                  className="bg-white border w-10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg p-2"
                  onClick={() => handleRemoveOption(key)}
                >
                  <IoTrashOutline />
                </Button>
              )}
            </div>
          </div>
        );
      })}
      <Button
        onClick={handleAddOption}
        className="w-full mt-1 bg-white text-gray-700 border hover:bg-gray-700 hover:text-white hover:border-transparent rounded-lg p-2"
      >
        + Add choice
      </Button>
    </div>
  );
};

export default AddChoiceForm;
