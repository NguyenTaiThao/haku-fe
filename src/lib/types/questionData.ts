export type QuestionType = {
  question: string;
  answers: string[];
  correct_index: number;
};
export type QuestionTypeRes = {
  success: boolean;
  message: string;
  data: QuestionType[];
};
