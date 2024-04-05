import { ColumnDef } from "@tanstack/react-table";
import { IoTrashOutline } from "react-icons/io5";

export interface Urgent {
  index: number;
  urgentId: number;
  urgentName: string;
  urgencyId: number;
  urgencyDetail: string;
  duration: string;
  urgencyLevel: number;
  onDelete: (urgentId: number, urgentName: string) => void;
}

export const columns: ColumnDef<Urgent>[] = [
  {
    header: "No.",
    cell: ({ row }) => {
      return row.original.index + 1;
    },
    enableSorting: false,
  },
  {
    accessorKey: "urgentId",
    header: "Urgent ID",
  },
  {
    accessorKey: "urgentName",
    header: "Urgent Name",
  },
  {
    accessorKey: "urgencyDetail",
    header: "Urgent Detail",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "urgencyLevel",
    header: "Severity Level",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const urgent = row.original;
      return (
        <div
          onClick={() => {
            urgent.onDelete(urgent.urgentId, urgent.urgentName);
          }}
          className="text-red-600 w-fit text-lg transition-all cursor-pointer hover:scale-125"
        >
          <IoTrashOutline />
        </div>
      );
    },
  },
];
