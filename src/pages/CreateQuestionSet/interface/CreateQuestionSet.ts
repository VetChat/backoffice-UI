export interface QuestionData {
  questionSetId: number;
  question: string;
  pattern: string;
  imagePath?: string;
  ordinal: number;
  haveImage?: boolean;
  listAnswer?: AnswerData[];
}

export interface AnswerData {
  answer?: string;
  summary?: string | null;
  skipToQuestion?: number | null;
}
