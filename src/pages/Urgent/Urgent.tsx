import {
  AnimalsService,
  UrgencyService,
  UrgentCaseResponse,
  UrgentCasesService,
} from "@/client";
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
import { UrgentReqBody } from "./interface/Urgent";

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

  const urgency = useQuery({
    queryKey: ["urgency"],
    queryFn: () => UrgencyService.urgencyGetAllUrgency(),
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
          onDelete: deleteUrgencyData,
        }));
        return urgent;
      }),
    enabled: !!selectedAnimalId,
  });

  const addUrgent = useMutation({
    mutationFn: (reqBody: UrgentReqBody) =>
      UrgentCasesService.urgentCasesAddUrgentCase({
        requestBody: {
          urgentName: reqBody.urgentName,
          urgencyId: reqBody.urgencyId,
          animalId: parseInt(selectedAnimalId!),
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["urgents"],
      }),
  });

  const deleteUrgent = useMutation({
    mutationFn: (urgentId: number) =>
      UrgentCasesService.urgentCasesRemoveUrgentCase({ urgentId: urgentId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["urgents"],
      }),
  });

  const addUrgentData = (reqBody: UrgentReqBody) => {
    addUrgent.mutateAsync(reqBody).then((res: UrgentCaseResponse) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: res.message,
      });
    });
  };

  const deleteUrgencyData = (urgentId: number, urgentName: string) => {
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

  return (
    <div className="p-10 w-full h-full">
      <PageTitle>Urgent Symptoms</PageTitle>
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
      <div className="mt-5">
        {urgents.data && urgency.data && (
          <DataTable
            urgencies={urgency.data}
            columns={columns}
            data={urgents.data}
            handleAddUrgent={addUrgentData}
          />
        )}
      </div>
    </div>
  );
};

export default Urgent;
