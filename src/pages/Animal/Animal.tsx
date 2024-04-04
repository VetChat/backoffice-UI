import { AnimalsService } from "@/client";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import {
  Animal as Animals,
  columns,
} from "@/components/Table/AnimalTable/Columns";
import DataTable from "@/components/Table/AnimalTable/DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Animal = () => {
  const queryClient = useQueryClient();

  const animals = useQuery({
    queryKey: ["animals"],
    queryFn: () =>
      AnimalsService.animalsGetAnimal().then((res) => {
        const animals: Animals[] = res.map((item, index) => ({
          index: index,
          animalId: item.animalId,
          animalName: item.animalName,
          onDelete: deleteAnimalData,
        }));
        return animals;
      }),
  });

  const postAnimal = useMutation({
    mutationFn: (animalName: string) =>
      AnimalsService.animalsAddAnimal({
        requestBody: { animalName: animalName },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["animals"],
      });
    },
  });

  const deleteAnimal = useMutation({
    mutationFn: (animalId: number) =>
      AnimalsService.animalsRemoveAnimal({ animalId: animalId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["animals"],
      });
    },
  });

  const addAnimalData = (animalName: string) => {
    postAnimal.mutateAsync(animalName).then((res) => {
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

  const deleteAnimalData = (animalId: number, animalName: string) => {
    Swal.fire({
      title: `Deleting '${animalName}'`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnimal.mutateAsync(animalId).then((res) => {
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
      <PageTitle>Animal</PageTitle>
      <div className="pt-10">
        {animals.data && (
          <DataTable
            handleAddAnimal={addAnimalData}
            data={animals.data}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default Animal;
