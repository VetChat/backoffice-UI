import { useQuery } from "@tanstack/react-query";
import { SummaryService } from "@/client/services/SummaryService";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/Table/CaseTable/DataTable";

const Summary = () => {
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

    return temp;
  }, [caseData]);

  return (
    <div>
      <div className="p-10 w-full h-full text-black">
        <PageTitle>Case Summary</PageTitle>
        <div className="pt-10">
          {caseData.data && (
            <DataTable columns={columns} data={caseData.data} />
          )}
        </div>
        <div className="mt-10"></div>
      </div>
    </div>
  );
};

export default Summary;
