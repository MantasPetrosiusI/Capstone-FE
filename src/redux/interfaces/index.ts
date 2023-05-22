export interface RootState {
  df: dfState;
}

export interface dfState {
  user: User;
  allUsers: User[];
  questionState: {
    questions: Question[];
    currentQuestion: Question;
  };
  userQuestionState: {
    questions: Question[];
    currentQuestion: Question;
  };
  fetchedAnswer: {
    user: User;
    question: string;
    body: string;
    pending: boolean;
    selected: boolean;
    rejected: boolean;
  };
  allSearch: Question[];
  allUsersSearch: User[];
}

export type DFAction =
  | { type: "RESET_ANSWER"; payload: Answer }
  | { type: "SET_CURRENT_USER"; payload: User }
  | { type: "FETCH_USER"; payload: User & { answers: Answer[] } }
  | { type: "FETCH_USERS"; payload: User[] }
  | { type: "LOGOUT_USER" }
  | { type: "EDIT_AVATAR"; payload: string }
  | { type: "ADD_QUESTION"; payload: any }
  | { type: "LIKE_QUESTION"; payload: any }
  | { type: "ADD_ANSWER"; payload: any }
  | { type: "SET_SEARCH_QUESTIONS"; payload: Question[] }
  | { type: "SET_SEARCH_USERS"; payload: User[] }
  | { type: "SET_QUESTIONS"; payload: Question[] }
  | { type: "FETCH_USER_QUESTIONS"; payload: Question[] }
  | { type: "FETCH_QUESTION_ANSWERS"; payload: Answer[] }
  | { type: "FETCH_ANSWER"; payload: Answer }
  | { type: "FETCH_USER_ANSWERS"; payload: Answer[] };

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  reputation: number;
  role: string;
  online: boolean;
  answers: Answer[];
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  language: string;
  tags: string[];
  user: User;
  noOfLikes: number;
  createdAt: Date;
  updatedAt: Date;
  answered: boolean;
  answers: Answer[];
  likedBy: string[];
}

export interface Answer {
  user: User;
  question: string;
  body: string;
  pending: boolean;
  selected: boolean;
  rejected: boolean;
}
