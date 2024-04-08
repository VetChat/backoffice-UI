import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionTypeDropdownProps } from "./interface/Dropdown";

const QuestionTypeDropdown: React.FC<QuestionTypeDropdownProps> = ({
  questionType,
  setQuestionType,
}) => {
  const typeOptions = ["choice", "text"];

  return (
    <Select
      defaultValue={questionType}
      onValueChange={(value) => setQuestionType(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Question Type" />
      </SelectTrigger>
      <SelectContent>
        {typeOptions.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuestionTypeDropdown;
