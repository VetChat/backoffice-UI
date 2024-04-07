import { useQuery } from "@tanstack/react-query";
import { SummaryService } from "@/client/services/SummaryService";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/Table/CaseTable/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MdMoreHoriz } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

const Summary = () => {
  const nevigate = useNavigate();

  const caseData = useQuery({
    queryKey: ["summary"],
    queryFn: () =>
      SummaryService.summaryGetSummary({}).then((res) => {
        const headerLabel = res.label.map((item) => item.ticketQuestion);
        const data: Record<string, any>[] = [];
        res.listTicket.map((caseItem) => {
          const filteredInfo = caseItem.info.filter((item) =>
            headerLabel.includes(item.ticketQuestion)
          );
          const d: Record<string, any> = {};
          d["caseId"] = caseItem.ticketId;
          filteredInfo.map((item) => {
            d[item.ticketQuestion] = item.ticketAnswer;
          });
          data.push(d);
        });
        return data;
      }),
  });

  const columns: ColumnDef<any>[] = useMemo(() => {
    if (!caseData.data || !caseData.data.length) return [];

    // Take the first item to extract keys for columns
    const keys = Object.keys(caseData.data[0]);

    const temp: ColumnDef<any>[] = keys.map((key) => ({
      header: key,
      accessorKey: key, // Use the key as accessor
    }));

    temp.push({
      id: "actions",
      cell: ({ row }) => {
        const currentCase = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MdMoreHoriz className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => nevigate(`/case/${currentCase.caseId}`)}
              >
                View summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });

    return temp;
  }, [caseData]);

  return (
    <div className="p-10 w-full h-full text-black">
      <PageTitle>Case Summary</PageTitle>
      <div className="pt-10">
        {caseData.data && <DataTable columns={columns} data={caseData.data} />}
      </div>
      <div className="mt-10"></div>
    </div>
  );
};

export default Summary;
