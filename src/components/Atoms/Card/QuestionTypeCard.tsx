import { IoChatboxOutline, IoCheckmarkOutline } from "react-icons/io5";
import { QuestionTypeCardProps } from "./interface/Card";

const QuestionTypeCard: React.FC<QuestionTypeCardProps> = ({
  handleAppendQuestion,
}) => {
  const typeOptions = ["choice", "text"];

  return (
    <div>
      <div className="text-xl font-semibold pb-2">Add a question</div>
      <div className="flex h-36 gap-3">
        {typeOptions.map((type) => (
          <div
            key={type}
            onClick={() => handleAppendQuestion(type)}
            className={`bg-white flex flex-col items-center justify-center border w-36 h-full rounded-3xl cursor-pointer transition hover:border-2 group hover:border-[#1B123F] hover:text-[#1B123F] hover:font-bold`}
          >
            <div
              className={`flex items-center justify-center mb-2 w-[62px] h-[65px] rounded-3xl bg-gray-100 text-[#87819D] transition group-hover:bg-[#1B123F] group-hover:text-white`}
            >
              {type === "choice" ? (
                <IoCheckmarkOutline className="h-10 w-8" />
              ) : (
                <IoChatboxOutline className="h-10 w-8" />
              )}
            </div>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionTypeCard;
