import { ColumnDef } from "@tanstack/react-table";
import { IoTrashOutline } from "react-icons/io5";
export interface Animal {
  index: number;
  animalId: number;
  animalName: string;
  onDelete: (animalId: number, animalName: string) => void;
}

export const columns: ColumnDef<Animal>[] = [
  {
    header: "No.",
    cell: ({ row }) => {
      return row.original.index + 1;
    },
    enableSorting: false,
  },
  {
    accessorKey: "animalId",
    header: "Animal ID",
  },
  {
    accessorKey: "animalName",
    header: "Animal Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const animal = row.original;
      return (
        <div
          onClick={() => {
            animal.onDelete(animal.animalId, animal.animalName);
          }}
          className="text-red-600 w-fit text-lg transition-all cursor-pointer hover:scale-125"
        >
          <IoTrashOutline />
        </div>
      );
    },
  },
];
