import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { IoTrashOutline } from "react-icons/io5";
import { TbArrowsUpDown } from "react-icons/tb";

export interface Animal {
  index: number;
  animalId: number;
  animalName: string;
  onDelete: (animalId: number) => void;
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
    header: ({ column }) => {
      return (
        <Button
          className="w-fit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Animal ID
          <TbArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
            animal.onDelete(animal.animalId);
          }}
          className="text-red-600 w-fit text-lg transition-all cursor-pointer hover:scale-125"
        >
          <IoTrashOutline />
        </div>
      );
    },
  },
];
