export interface RootState {
  df: dfState;
}

export interface dfState {
  currentUser: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    reputation: number;
    role: string;
    online: boolean;
  };
  questionState: {
    questions: Question[];
    currentQuestion: Question | null;
  };
}

export interface setCurrentUser {
  type: "SET_CURRENT_USER";
  payload: User;
}
export interface logout {
  type: "LOGOUT";
}
export interface editAvatar {
  type: "EDIT_AVATAR";
  payload: string;
}
export interface newQuestion {
  type: "ADD_QUESTION";
  payload: any;
}
export interface setQuestions {
  type: "SET_QUESTIONS";
  payload: Question[];
}
export interface fetchUserQuestions {
  type: "FETCH_USER_QUESTIONS";
  payload: Question[];
}
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  reputation: number;
  role: string;
  online: boolean;
}
export interface Question {
  _id: string;
  title: string;
  description: string;
  language: string;
  tags: string[];
  user: QuestionUser;
  createdAt?: Date;
  updatedAt?: Date;
  answered: boolean;
}
export interface QuestionUser {
  username: string;
  reputation: number;
  role: string;
}
