import {
  dfState,
  setCurrentUser,
  editAvatar,
  newQuestion,
  newAnswer,
  setQuestions,
  fetchUserQuestions,
  logout,
  fetchUser,
  questionAnswers,
  fetchAnswer,
  resetAnswer,
  fetchUsers,
  searchQuestions,
} from "../interfaces/index";

type Action =
  | setCurrentUser
  | fetchUsers
  | editAvatar
  | newQuestion
  | newAnswer
  | fetchAnswer
  | setQuestions
  | fetchUserQuestions
  | questionAnswers
  | logout
  | fetchUser
  | searchQuestions
  | resetAnswer;

const initialState: dfState = {
  currentUser: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
    reputation: 0,
    role: "",
    online: false,
    answers: [],
  },
  allUsers: [
    {
      _id: "",
      username: "",
      email: "",
      avatar: "",
      reputation: 0,
      role: "",
      online: false,
      answers: [],
    },
  ],
  questionState: {
    questions: [],
    currentQuestion: {
      _id: "",
      title: "",
      description: "",
      language: "",
      tags: [],
      user: {
        _id: "",
        username: "",
        email: "",
        avatar: "",
        reputation: 0,
        role: "",
        online: false,
        answers: [],
      },
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      noOfLikes: 0,
      answered: false,
      answers: [],
    },
  },
  userQuestionState: {
    questions: [],
    currentQuestion: {
      _id: "",
      title: "",
      description: "",
      language: "",
      tags: [],
      user: {
        _id: "",
        username: "",
        email: "",
        avatar: "",
        reputation: 0,
        role: "",
        online: false,
        answers: [],
      },
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      noOfLikes: 0,
      answered: false,
      answers: [],
    },
  },
  fetchedUser: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
    reputation: 0,
    role: "",
    online: false,
    answers: [],
  },
  fetchedAnswer: {
    user: {
      _id: "",
      username: "",
      email: "",
      avatar: "",
      reputation: 0,
      role: "",
      online: false,
      answers: [],
    },
    question: "",
    body: "",
    pending: true,
    selected: false,
    rejected: false,
  },
  allSearch: [],
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
    case "FETCH_USER":
      return {
        ...state,
        fetchedUser: {
          ...action.payload,
        },
      };
    case "FETCH_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "LOGOUT_USER":
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
          hasFetched: true,
        },
      };
    }
    case "SET_SEARCH_QUESTIONS":
      return {
        ...state,
        allSearch: action.payload,
      };
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
        userQuestionState: {
          ...state.userQuestionState,
          questions: action.payload,
        },
      };
    case "FETCH_QUESTION_ANSWERS":
      return {
        ...state,
        questionState: {
          ...state.questionState,
          currentQuestion: {
            ...state.questionState.currentQuestion,
            answers: [
              ...state.questionState.currentQuestion.answers,
              action.payload,
            ],
          },
        },
      };
    case "FETCH_ANSWER":
      return {
        ...state,
        fetchedAnswer: {
          ...action.payload,
        },
      };
    case "RESET_ANSWER":
      return {
        ...state,
        fetchedAnswer: {
          user: {
            _id: "",
            username: "",
            email: "",
            avatar: "",
            reputation: 0,
            role: "",
            online: false,
          },
          question: "",
          body: "",
          pending: true,
          selected: false,
          rejected: false,
        },
      };
    default:
      return state;
  }
};

export default dfReducer;
