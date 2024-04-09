import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import QuestionTypeCard from "../../components/Atoms/Card/QuestionTypeCard";
import { Input } from "../../components/ui/input";
import AddChoiceForm from "../../components/Form/QuestionSetForm/ChoiceForm";
import QuestionTypeDropdown from "@/components/Atoms/Dropdown/QuestionTypeDropdown";
import { Button } from "@/components/ui/button";
import { FiMinimize2 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { QuestionSetService } from "@/client";
import { useQuery } from "@tanstack/react-query";

const REQUIRED_ERROR = "This field is required";
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  activeQuestionSet: z.string(),
  stages: z.array(
    z.object({
      questionName: z.string().nonempty(REQUIRED_ERROR),
      questionType: z.string().nonempty(REQUIRED_ERROR),
      image: z
        .any()
        .refine((files) => {
          if (!files) return true;
          return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type);
        }, "File type should be jpeg, jpg, png, or webp")
        .optional(),
      options: z.array(
        z.object({
          optionName: z.string().nonempty(REQUIRED_ERROR),
          optionSummary: z.string().optional(),
          skipToQuestion: z.number().int().optional(),
        })
      ),
    })
  ),
});

const useDynamicForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activeQuestionSet: "",
      stages: [],
    },
  });

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stages",
  });

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleAppend = (questionType: string) => {
    append({
      questionName: "",
      questionType: questionType,
      image: "",
      options: [{ optionName: "", optionSummary: "" }],
    });

    form.setValue("activeQuestionSet", "");
  };

  return { form, onSubmitForm, fields, handleRemove, handleAppend };
};

const CreateQuestionSet: React.FC = () => {
  // const { questionSetId } = useParams();

  // const questionSet = useQuery({
  //   queryKey: ["questionSetData", questionSetId],
  //   queryFn: () =>
  //     QuestionSetService.getQuestionSetByQuestionSetIdQuestionSetQuestionSetIdGet(
  //       {
  //         questionSetId: Number(questionSetId),
  //       }
  //     ).then((res) => {
  //       const formData = res.map((item) => ({
  //         activeQuestopnSet: "",
  //         stages: [
  //           {
  //             questionName: item.question,
  //             questionType: item.pattern,
  //             image: item.imagePath,
  //             options: item.listAnswer.map((answer) => ({
  //               optionName: answer.answer,
  //               optionSummary: answer.,
  //             })),
  //             }))
  //           },
  //         ],
  //       }))
  //     }),
  // });

  const { form, onSubmitForm, fields, handleRemove, handleAppend } =
    useDynamicForm();

  form.watch();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="pt-10">
        {fields.map(({ id }, index) => (
          <div key={id} className="transition-all duration-1000">
            {form.getValues("activeQuestionSet") === id ? (
              <div className="flex gap-4 my-2">
                <div className="border-zinc-950 border-2 rounded-2xl w-[900px] p-5">
                  <div>
                    <div className="flex justify-between">
                      <div className="font-bold text-2xl pb-5">
                        Question {index + 1}
                      </div>
                      <div
                        onClick={() => form.setValue("activeQuestionSet", "")}
                        className="cursor-pointer"
                      >
                        <FiMinimize2 />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name={`stages.${index}.questionType`}
                      render={({ field }) => (
                        <FormItem className="pb-5 w-[200px]">
                          <FormControl>
                            <QuestionTypeDropdown
                              questionType={field.value}
                              setQuestionType={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name={`stages.${index}.questionName`}
                        render={({ field }) => (
                          <FormItem className="pb-5">
                            <FormLabel className="text-xl font-semibold">
                              Question Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                spellCheck
                                placeholder="Question..."
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
                        name={`stages.${index}.image`}
                        render={({ field }) => (
                          <div>
                            <FormItem>
                              <FormLabel className="text-xl">Image</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  id="image"
                                  placeholder="Add Image..."
                                  {...field}
                                  value={undefined}
                                  onChange={(e) => {
                                    if (!e.target.files) {
                                      console.error("No file selected");
                                      return;
                                    }
                                    const file = e.target.files[0];
                                    field.onChange([file]);
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem>
                              {field.value && field.value != "" && (
                                <div className="border ">
                                  <img
                                    src={URL.createObjectURL(field.value[0])}
                                    alt="image"
                                    style={{ maxWidth: "350px" }}
                                  />
                                </div>
                              )}
                            </FormItem>
                          </div>
                        )}
                      />
                    </div>
                    {form.getValues(`stages.${index}.questionType`) ===
                      "choice" && (
                      <AddChoiceForm nestIndex={index} control={form.control} />
                    )}
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => handleRemove(index)}
                    className="flex h-full bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500 items-center rounded-lg"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => form.setValue("activeQuestionSet", id)}
                className="flex my-2 w-[600px] border rounded-2xl h-28 items-center justify-between cursor-pointer transition hover:shadow-lg hover:font-bold hover:text-[#1B123F]"
              >
                <div className="px-10">
                  <div className="font-semibold text-sm">
                    Question {index + 1} -{" "}
                    {form.getValues(`stages.${index}.questionType`)}
                  </div>
                  <div className="text-lg font-bold">
                    {form.getValues(`stages.${index}.questionName`) || "N/A"}
                  </div>
                </div>
                <div
                  onClick={() => handleRemove(index)}
                  className="flex items-center transition cursor-pointer hover:border-red-600 hover:scale-110 justify-center mr-10 bg-gray-100 h-10 w-10 border rounded-xl"
                >
                  <div className="text-sm font-semibold text-red-600">
                    <IoTrashOutline size={20} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <FormItem className="py-5">
          <FormControl>
            <QuestionTypeCard handleAppendQuestion={handleAppend} />
          </FormControl>
          <FormMessage />
        </FormItem>
      </form>
    </Form>
  );
};

export default CreateQuestionSet;
