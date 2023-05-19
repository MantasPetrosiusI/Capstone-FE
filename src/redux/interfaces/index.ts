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
    answers: Answer[];
  };
  allUsers: User[];
  questionState: {
    questions: Question[];
    currentQuestion: Question;
  };
  userQuestionState: {
    questions: Question[];
    currentQuestion: Question;
  };
  fetchedUser: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    reputation: number;
    role: string;
    online: boolean;
    answers: Answer[];
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
export interface resetAnswer {
  type: "RESET_ANSWER";
  payload: Answer;
}
export interface setCurrentUser {
  type: "SET_CURRENT_USER";
  payload: User;
}
export interface fetchUser {
  type: "FETCH_USER";
  payload: User & { answers: Answer[] };
}
export interface fetchUsers {
  type: "FETCH_USERS";
  payload: User[];
}
export interface logout {
  type: "LOGOUT_USER";
}
export interface editAvatar {
  type: "EDIT_AVATAR";
  payload: string;
}
export interface newQuestion {
  type: "ADD_QUESTION";
  payload: any;
}
export interface likeQuestion {
  type: "LIKE_QUESTION";
  payload: any;
}
export interface newAnswer {
  type: "ADD_ANSWER";
  payload: any;
}
export interface searchQuestions {
  type: "SET_SEARCH_QUESTIONS";
  payload: Question[];
}
export interface searchUsers {
  type: "SET_SEARCH_USERS";
  payload: User[];
}
export interface setQuestions {
  type: "SET_QUESTIONS";
  payload: Question[];
}
export interface fetchUserQuestions {
  type: "FETCH_USER_QUESTIONS";
  payload: Question[];
}
export interface questionAnswers {
  type: "FETCH_QUESTION_ANSWERS";
  payload: Answer[];
}
export interface fetchAnswer {
  type: "FETCH_ANSWER";
  payload: Answer;
}
export interface fetchUserAnswers {
  type: "FETCH_USER_ANSWERS";
  payload: Answer[];
}
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
export interface QuestionUser {
  username: string;
  reputation: number;
  role: string;
}
