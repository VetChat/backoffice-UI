import { ColumnDef } from "@tanstack/react-table";
import { IoTrashOutline } from "react-icons/io5";

export interface Symptom {
  index: number;
  symptomId: number;
  symptomName: string;
  onDelete: (symptomId: number, symptomName: string) => void;
}

export const columns: ColumnDef<Symptom>[] = [
  {
    header: "No.",
    cell: ({ row }) => {
      return row.original.index + 1;
    },
    enableSorting: false,
  },
  {
    accessorKey: "symptomId",
    header: "Symptom ID",
  },
  {
    accessorKey: "symptomName",
    header: "Symptom Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const symptom = row.original;
      return (
        <div
          onClick={() => {
            symptom.onDelete(symptom.symptomId, symptom.symptomName);
          }}
          className="text-red-600 w-fit text-lg transition-all cursor-pointer hover:scale-125"
        >
          <IoTrashOutline />
        </div>
      );
    },
  },
];
