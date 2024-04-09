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
import { useNavigate, useParams } from "react-router-dom";
import {
  AnswerRead,
  Body_Question_update_questions,
  QuestionService,
  QuestionSetService,
  QuestionWithListAnswer,
} from "@/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import Swal from "sweetalert2";
import { AnswerData, QuestionData } from "./interface/CreateQuestionSet";

const REQUIRED_ERROR = "This field is required";
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const formSchema = z.object({
  activeQuestionSet: z.string(),
  stages: z.array(
    z.object({
      // questionSetId will be added in onSubmit
      questionId: z.number().int().optional(),
      question: z.string().nonempty(REQUIRED_ERROR),
      pattern: z.string().nonempty(REQUIRED_ERROR),
      // ordinal will be added in onSubmit
      imageFile: z
        .any()
        .refine((files) => {
          if (!files) return true;
          return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type);
        }, "File type should be jpeg, jpg, png, or webp")
        .optional(),
      imageUrl: z.string().optional(),
      // haveImage will be added in onSubmit,
      haveImage: z.boolean().optional(),
      listAnswer: z.array(
        z.object({
          answer: z.string().optional(),
          summary: z.string().optional().nullable(),
          skipToQuestion: z.number().int().optional().nullable(),
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stages",
  });

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleAppend = (questionType: string) => {
    append({
      question: "",
      pattern: questionType,
      imageFile: "",
      imageUrl: "",
      haveImage: false,
      listAnswer: [{ answer: "", summary: "", skipToQuestion: null }],
    });

    form.setValue("activeQuestionSet", "");
  };

  return { form, fields, handleRemove, handleAppend };
};

const CreateQuestionSet: React.FC = () => {
  const { form, fields, handleRemove, handleAppend } = useDynamicForm();
  const { questionSetId } = useParams();
  const nevigate = useNavigate();

  const questionSet = useQuery({
    queryKey: ["questionSetData", questionSetId],
    queryFn: () =>
      QuestionSetService.getQuestionSetByQuestionSetIdQuestionSetQuestionSetIdGet(
        {
          questionSetId: Number(questionSetId),
        }
      ).then((res) => {
        const formData = res.map(async (item) => ({
          question: item.question,
          pattern: item.pattern,
          imageFile: null,
          imageUrl: item.imagePath || "",
          haveImage: false,
          listAnswer: item.listAnswer.map((answer) => ({
            answer: answer?.answer,
            summary: answer?.summary,
            skipToQuestion: answer?.skipToQuestion,
          })),
        }));
        return Promise.all(formData);
      }),
  });

  // const updateQuestionSet = useMutation({
  //   mutationFn: (data: Body_Question_update_questions) =>
  //     QuestionService.questionUpdateQuestions({ formData: data }),
  //   onSuccess: () => {
  //     Swal.fire({
  //       title: "Question Set Updated",
  //       icon: "success",
  //       timer: 2000,
  //     }).then(() => {
  //       nevigate("/questionSet");
  //     });
  //   },
  // });

  useEffect(() => {
    if (questionSet.data) {
      form.setValue("stages", questionSet.data);
    }
  }, [questionSet.data]);

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    const imageFiles: File[] = [];
    const questionData: QuestionData[] = [];

    values.stages.map((stage, index) => {
      const answerList: AnswerData[] = stage.listAnswer.map((answer) => ({
        answer: answer.answer,
        summary: answer.summary,
        skipToQuestion: answer.skipToQuestion,
      }));

      const question: QuestionData = {
        questionSetId: parseInt(questionSetId!),
        question: stage.question,
        pattern: stage.pattern,
        ordinal: index + 1,
        haveImage: stage.haveImage,
        listAnswer: stage.pattern === "choice" ? answerList : [],
      };
      questionData.push(question);

      if (stage.imageFile) {
        const newName = `${stage.question.replace(/ /g, "-")}`;
        const renamedFile = new File([stage.imageFile[0]], newName, {
          type: stage.imageFile[0].type,
        });
        imageFiles.push(renamedFile);
      }
    });

    console.log(JSON.stringify(questionData));

    const formData: Body_Question_update_questions = {
      questions_data: JSON.stringify(questionData),
      images: imageFiles,
    };

    console.log(formData);

    // updateQuestionSet.mutate(formData);

    // console.log(JSON.stringify(data));
  };

  form.watch();

  return (
    <div className="p-10 w-full h-full">
      <PageTitle>Create Question Set</PageTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="pt-10 w-full"
        >
          {fields.map(({ id }, index) => (
            <div key={id} className="transition-all duration-1000 w-full">
              {form.getValues("activeQuestionSet") === id ? (
                <div className="w-full my-2">
                  <div className="border-gray-700 border-2 rounded-2xl p-5">
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
                        name={`stages.${index}.pattern`}
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
                          name={`stages.${index}.question`}
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
                        <div>
                          <FormField
                            control={form.control}
                            name={`stages.${index}.imageFile`}
                            render={({ field }) => (
                              <div>
                                <FormItem>
                                  <FormLabel className="text-xl">
                                    Image
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="file"
                                      id="image"
                                      className="cursor-pointer"
                                      placeholder="Add Image..."
                                      {...field}
                                      value={undefined}
                                      onChange={(e) => {
                                        if (!e.target.files) {
                                          console.error("No file selected");
                                          return;
                                        }
                                        const file = e.target.files[0];
                                        const url = file
                                          ? URL.createObjectURL(file)
                                          : "";
                                        form.setValue(
                                          `stages.${index}.imageUrl`,
                                          url
                                        );
                                        form.setValue(
                                          `stages.${index}.haveImage`,
                                          url != "" ? true : false
                                        );
                                        field.onChange([file]);
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              </div>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`stages.${index}.imageUrl`}
                            render={({ field }) => (
                              <div className="">
                                <FormItem>
                                  {field.value && field.value != "" && (
                                    <div className="border ">
                                      <img
                                        src={field.value}
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
                      </div>
                      {form.getValues(`stages.${index}.pattern`) ===
                        "choice" && (
                        <AddChoiceForm
                          nestIndex={index}
                          control={form.control}
                        />
                      )}
                      <div className="flex gap-3 items-center mt-4">
                        <Button
                          onClick={() => form.setValue("activeQuestionSet", "")}
                          className="flex w-full bg-gray-500 text-white hover:bg-white hover:text-gray-500 hover:border hover:border-gray-500 items-center rounded-lg"
                        >
                          Done Editing
                        </Button>
                        <Button
                          onClick={() => {
                            Swal.fire({
                              title: `Deleting question: '${
                                form.getValues(`stages.${index}.question`) ??
                                "N/A"
                              }'`,
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleRemove(index);
                              }
                            });
                          }}
                          className="flex bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500 items-center rounded-lg"
                        >
                          Delete Question
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => form.setValue("activeQuestionSet", id)}
                  className="flex my-2 transition border rounded-2xl h-28 items-center justify-between cursor-pointer hover:shadow-lg hover:font-bold hover:text-[#1B123F]"
                >
                  <div className="px-10">
                    <div className="font-semibold text-sm">
                      Question {index + 1} -{" "}
                      {form.getValues(`stages.${index}.pattern`)}
                    </div>
                    <div className="text-lg font-bold">
                      {form.getValues(`stages.${index}.question`) || "N/A"}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      Swal.fire({
                        title: `Deleting question: '${
                          form.getValues(`stages.${index}.question`) ?? "N/A"
                        }'`,
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleRemove(index);
                        }
                      });
                    }}
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
          <div className="py-5 flex justify-between">
            <QuestionTypeCard handleAppendQuestion={handleAppend} />
            <div className="flex justify-end items-end gap-4">
              <Button
                onClick={() => {
                  nevigate("/questionSet");
                }}
                className="bg-white w-32 h-20 border border-red-600 text-red-600 hover:bg-white hover:text-[#1B123F] hover:border-[#1B123F] rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1B123F] w-32 h-20 border text-white hover:bg-white hover:text-[#1B123F] hover:border-[#1B123F] rounded-lg"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateQuestionSet;
