import { SummaryService } from "@/client";
import PageTitle from "@/components/Atoms/Text/PageTitle";
import { Blockquote } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { useParams } from "react-router-dom";

const Case = () => {
  const { caseId } = useParams();

  const summary = useQuery({
    queryKey: ["case"],
    queryFn: () =>
      SummaryService.summaryGetSummaryByTicketId({
        ticketId: parseInt(caseId!),
      }),
  });

  return (
    <div className="p-10 w-full h-full text-black">
      <div className="flex py-5 px-10 border-2 rounded-3xl w-fit">
        <div className="w-[6px] bg-[#03A96B] rounded-2xl mr-2"></div>
        <PageTitle>Case: {caseId}</PageTitle>
      </div>
      <div className="flex flex-col border rounded-xl mt-4 p-10">
        <div className="flex">
          <div className="w-[6px] bg-[#03A96B] rounded-2xl mr-2" />
          <div className="text-[28px] font-semibold">Case Information:</div>
        </div>
        <div className="flex pt-10 pl-3">
          <div className="w-[6px] bg-blue-500 rounded-2xl mr-2" />
          <div className="flex flex-col">
            {summary.data?.info.map((item, index) => (
              <div key={index} className="flex gap-x-2 p-2">
                <div className="text-xl font-bold">{item.ticketQuestion}:</div>
                <div className="text-lg">{item.ticketAnswer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col border rounded-xl mt-4 p-10">
        <div className="flex">
          <div className="w-[6px] bg-[#03A96B] rounded-2xl mr-2"></div>
          <PageTitle>Question&Answer:</PageTitle>
        </div>
        {summary.data?.summary.map((item, index) => (
          <div key={index} className="flex flex-col mt-4 w-[500px]">
            <div className="flex font-semibold py-4 text-2xl">
              <div className="w-1 bg-[#664EC4] rounded-2xl mr-2" />
              {item.symptomName}
            </div>
            {item.listAnswer.map((item, index) => (
              <div key={index} className="flex flex-col pb-6">
                <div className="text-xl font-medium">
                  {index + 1}: {item.question}
                </div>
                <div className="flex pt-2">
                  <div className="text-xl font-bold pr-2">Answer:</div>
                  <div className="text-lg">{item.answer}</div>
                </div>
                {item.summary && (
                  <Blockquote
                    color="blue"
                    radius="md"
                    iconSize={30}
                    icon={<MdOutlineSpeakerNotes />}
                    mt="lg"
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
  );
};

export default Case;
