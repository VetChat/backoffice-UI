import { SymptomsService } from "@/client";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import {
  columns,
  Symptom as Symptoms,
} from "@/components/Table/Symptom/Columns";
import DataTable from "@/components/Table/Symptom/DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Symptom = () => {
  const queryClient = useQueryClient();

  const symptoms = useQuery({
    queryKey: ["symptoms"],
    queryFn: () =>
      SymptomsService.symptomsGetSymptoms().then((res) => {
        const symptom: Symptoms[] = res.map((item, index) => ({
          index: index,
          symptomId: item.symptomId,
          symptomName: item.symptomName,
          onDelete: deleteSymptomData,
        }));
        return symptom;
      }),
  });

  const postSymptom = useMutation({
    mutationFn: (symptomName: string) =>
      SymptomsService.symptomsAddSymptom({
        requestBody: {
          symptomName: symptomName,
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["symptoms"],
      }),
  });

  const deleteSymptom = useMutation({
    mutationFn: (symptomId: number) =>
      SymptomsService.symptomsRemoveSymptom({ symptomId: symptomId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["symptoms"],
      }),
  });

  const addSymptomData = (animalName: string) => {
    postSymptom.mutateAsync(animalName).then((res) => {
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

  const deleteSymptomData = (symptomId: number, symptomName: string) => {
    Swal.fire({
      title: `Deleting '${symptomName}'`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSymptom.mutateAsync(symptomId).then((res) => {
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
      <PageTitle>Symptoms</PageTitle>
      <div className="pt-10">
        {symptoms.data && (
          <DataTable
            handleAddSymptom={addSymptomData}
            data={symptoms.data}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default Symptom;
