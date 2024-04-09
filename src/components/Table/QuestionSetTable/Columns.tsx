import { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";

export interface Symptom {
  index: number;
  questionSetId: number;
  symptomName: string | undefined;
  symptomId: number;
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
    accessorKey: "symptomName",
    header: "Symptom Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const questionSetId = row.original.questionSetId;
      return (
        <div
          onClick={() => console.log(questionSetId)}
          className="flex items-center justify-center text-grey-400 w-fit text-lg transition-all cursor-pointer hover:scale-125"
        >
          <FiEdit />
        </div>
      );
    },
  },
];
