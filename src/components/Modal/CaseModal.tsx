import { SummaryService } from "@/client";
import { Blockquote } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { CaseModalProps } from "./interface/CaseModal";

const CaseModal: React.FC<CaseModalProps> = ({ caseId }) => {
  const summary = useQuery({
    queryKey: ["case"],
    queryFn: () =>
      SummaryService.summaryGetSummaryByTicketId({
        ticketId: parseInt(caseId!),
      }),
    enabled: !!caseId,
  });

  return (
    <div className="w-full h-full text-black">
      <hr />
      <div className="flex flex-col w-full p-4">
        <div className="mt-2">
          <div className="grid grid-rows-1 grid-flow-col">
            <div className="w-fit text-lg font-semibold">
              <div>Case:</div>
              {summary.data?.info.map((item, index) => (
                <div key={index}>{item.ticketQuestion}:</div>
              ))}
            </div>
            <div className="text-lg ml-10">
              <div>{caseId}</div>
              {summary.data?.info.map((item, index) => (
                <div key={index}>{item.ticketAnswer || "-"}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex px-4 pt-8 pb-4">
        <div className="text-lg font-semibold">Question&Answer</div>
      </div>
      <div className="p-4 border rounded-lg">
        {summary.data?.summary.map((item, index) => (
          <div key={index} className="flex flex-col w-[500px]">
            <div className="flex font-semibold text-2xl items-center mb-2">
              <div className="bg-gray-400 h-10 w-1 rounded-lg mr-2" />
              {item.symptomName}
            </div>
            {item.listAnswer.map((item, index) => (
              <div key={index} className="flex flex-col pb-6">
                <div className="font-medium text-lg">
                  {index + 1}. {item.question}
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-lg font-bold pr-2">Answer:</div>
                  <div className="text-base">{item.answer}</div>
                </div>
                {item.summary && (
                  <Blockquote
                    color="yellow"
                    radius="md"
                    iconSize={30}
                    icon={<MdOutlineSpeakerNotes />}
                    mt="lg"
                    ml="md"
                  >
                    {item.summary}
                  </Blockquote>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default CaseModal;
