import {
  dfState,
  setCurrentUser,
  editAvatar,
  newQuestion,
  setQuestions,
  fetchUserQuestions,
  logout,
} from "../interfaces/index";

type Action =
  | setCurrentUser
  | editAvatar
  | newQuestion
  | setQuestions
  | fetchUserQuestions
  | logout;

const initialState: dfState = {
  currentUser: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
    reputation: 0,
    role: "",
    online: false,
  },
  questionState: {
    questions: [],
    currentQuestion: {
      _id: "",
      title: "",
      description: "",
      language: "",
      tags: [],
      user: {
        username: "",
        reputation: 0,
        role: "",
      },
      answered: false,
    },
  },
};

const dfReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: {
          ...action.payload,
          online: true,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          online: false,
        },
      };
    case "EDIT_AVATAR":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.payload,
        },
      };
    case "SET_QUESTIONS": {
      return {
        ...state,
        questionState: {
          ...state.questionState,
          questions: action.payload,
        },
      };
    }
    case "ADD_QUESTION":
      return {
        ...state,
        questionState: {
          ...state.questionState,
          questions: [...state.questionState.questions, action.payload],
        },
      };
    case "FETCH_USER_QUESTIONS":
      return {
        ...state,
        questionState: {
          ...state.questionState,
        },
      };
    default:
      return state;
  }
};

export default dfReducer;
