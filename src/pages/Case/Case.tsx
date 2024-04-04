import { useQuery } from "@tanstack/react-query";
import { SummaryService } from "@/client/services/SummaryService";
import PageTitle from "@/components/Atoms/Text/PageTitle";

const Case = () => {
  const caseData = useQuery({
    queryKey: ["summary"],
    queryFn: () =>
      SummaryService.summaryGetSummary({ startAt: 0 }).then((res) =>
        console.log(res)
      ),
  });

  return (
    <div className="p-10 w-full h-full text-black">
      <PageTitle>Case Summary</PageTitle>
      <div className="mt-10"></div>
    </div>
  );
};

export default Case;
