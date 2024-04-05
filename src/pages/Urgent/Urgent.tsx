import { AnimalsService, UrgentCasesService } from "@/client";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import {
  columns,
  Urgent as Urgents,
} from "@/components/Table/UrgentTable/Columns";
import DataTable from "@/components/Table/UrgentTable/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const Urgent = () => {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>();

  const queryClient = useQueryClient();

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

  const urgents = useQuery({
    queryKey: ["urgents", selectedAnimalId],
    queryFn: () =>
      UrgentCasesService.urgentCasesGetUrgentCasesByAnimalId({
        animalId: parseInt(selectedAnimalId!),
      }).then((res) => {
        const urgent: Urgents[] = res.map((item, index) => ({
          index: index,
          urgentId: item.urgentId,
          urgentName: item.urgentName,
          urgencyId: item.urgencyId,
          urgencyDetail: item.urgencyDetail,
          urgencyLevel: item.urgencyLevel,
          duration: item.duration,
          onDelete: deleteSymptomData,
        }));
        return urgent;
      }),
    enabled: !!selectedAnimalId,
  });

  const deleteUrgent = useMutation({
    mutationFn: (urgentId: number) =>
      UrgentCasesService.urgentCasesRemoveUrgentCase({ urgentId: urgentId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["urgents"],
      }),
  });

  const deleteSymptomData = (urgentId: number, urgentName: string) => {
    Swal.fire({
      title: `Deleting '${urgentName}'`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUrgent.mutateAsync(urgentId).then((res) => {
          {
            Swal.fire({
              title: "Deleted!",
              text: res.message,
              icon: "success",
            });
          }
        });
      }
    });
  };

  // const deleteUrgentData = (urgentId: number) => {};

  return (
    <div className="p-10 w-full h-full">
      <PageTitle>Urgent Symptoms</PageTitle>
      <div className="flex flex-col w-[500px] mt-10 border p-10 rounded-lg">
        <div className="text-xl font-semibold pb-3">Choose animal:</div>
        <Select onValueChange={setSelectedAnimalId} value={selectedAnimalId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Animal"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {animalOption.data?.map((option) => (
              <SelectItem value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        {urgents.data && <DataTable columns={columns} data={urgents.data} />}
      </div>
    </div>
  );
};

export default Urgent;
