import { AnimalsService, QuestionSetService, SymptomsService } from "@/client";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import DataTable from "@/components/Table/QuestionSetTable/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "../../components/Table/QuestionSetTable/Columns";

const QuestionSet = () => {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>();
  // const [symptomOptions, setSymptomOptions] = useState<any[]>([]);

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

  const symptoms = useQuery({
    queryKey: ["symptom", selectedAnimalId],
    queryFn: () => SymptomsService.symptomsGetSymptoms().then((res) => res),
  });

  const questionSet = useQuery({
    queryKey: ["questionSet", selectedAnimalId],
    queryFn: () =>
      QuestionSetService.getQuestionSetByAnimalIdQuestionSetsAnimalAnimalIdGet({
        animalId: Number(selectedAnimalId),
      }).then((res) => {
        const questionSets = res.map((item, index) => ({
          index: index,
          questionSetId: item.questionSetId,
          symptomId: item.symptomId,
          symptomName: symptoms.data?.find(
            (symptom) => symptom.symptomId === item.symptomId
          )!.symptomName,
        }));
        return questionSets;
      }),
    // enabled: !!selectedAnimalId,
  });

  return (
    <div className="p-10 w-full h-full">
      <PageTitle>Question Set</PageTitle>
      <div className="flex flex-col w-[500px] mt-10 border-2 p-10 rounded-2xl border-black">
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
      </div>
      {questionSet.data && (
        <DataTable data={questionSet.data} columns={columns} />
      )}
    </div>
  );
};

export default QuestionSet;
