import { AnimalsService } from "@/client";
import QuestionTypeCard from "@/components/Atoms/Card/QuestionTypeCard";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import AddQuestionsForm from "@/components/Form/QuestionSetForm/AddQuestionForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const QuestionSet = () => {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>();

  const animalOption = useQuery({
    queryKey: ["animalOption"],
    queryFn: () =>
      AnimalsService.animalsGetAnimal().then((res) => {
        const options = res.map((animal) => ({
          value: animal.animalId,
          label: animal.animalName,
        }));
        const firstAnimal = options[0].value.toString();
        setSelectedAnimalId(firstAnimal);
        return options;
      }),
  });

  return (
    <div className="p-10 w-full h-full">
      <PageTitle>Question Set</PageTitle>
      {/* <div className="flex flex-col w-[500px] mt-10 border-2 p-10 rounded-2xl border-black">
        <div className="text-xl font-semibold pb-5">Choose Animal</div>
        <Select onValueChange={setSelectedAnimalId} value={selectedAnimalId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Animal"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {animalOption.data?.map((option, index) => (
              <SelectItem key={index} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}
      <AddQuestionsForm />
    </div>
  );
};

export default QuestionSet;
