import { dfState } from "../interfaces/index";

type Action =
  | { type: "PENDING_QUESTIONS"; payload: any }
  | { type: "PENDING_ANSWERS"; payload: any }
  | { type: "SET_CURRENT_USER"; payload: any }
  | { type: "FETCH_USER"; payload: any }
  | { type: "FETCH_USERS"; payload: any }
  | { type: "LOGOUT_USER" }
  | { type: "EDIT_AVATAR"; payload: string }
  | { type: "SET_QUESTIONS"; payload: any }
  | { type: "LIKE_QUESTION"; payload: string }
  | { type: "SET_SEARCH_QUESTIONS"; payload: any }
  | { type: "SET_SEARCH_USERS"; payload: any }
  | { type: "ADD_QUESTION"; payload: any }
  | { type: "FETCH_USER_QUESTIONS"; payload: any }
  | { type: "FETCH_QUESTION_ANSWERS"; payload: any }
  | { type: "FETCH_ANSWER"; payload: any }
  | { type: "UPDATE_QUESTION"; payload: any }
  | { type: "UPDATE_ANSWER"; payload: any }
  | { type: "RESET_ANSWER" };

const initialState: dfState = {
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
  allUsers: [],
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
      likedBy: [],
      pending: true,
      accepted: false,
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
      likedBy: [],
      pending: true,
      accepted: false,
    },
  },
  fetchedAnswer: {
    _id: "",
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
    question: {
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
      likedBy: [],
      pending: true,
      accepted: false,
    },
    body: "",
    pending: true,
    accepted: false,
    updatedAt: new Date(Date.now()),
  },
  allSearch: [],
  allUsersSearch: [],
  pendingAnswers: [],
  pendingQuestions: [],
};

const dfReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: {
          ...action.payload,
          online: true,
        },
      };
    case "FETCH_USER":
      return {
        ...state,
        fetchedUser: action.payload,
      };
    case "FETCH_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: {
          ...state.user,
          online: false,
        },
      };
    case "EDIT_AVATAR":
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questionState: {
          ...state.questionState,
          questions: action.payload,
        },
      };
    case "PENDING_QUESTIONS":
      return {
        ...state,
        pendingQuestions: action.payload,
      };
    case "LIKE_QUESTION":
      const { payload: questionId } = action;
      const likedQuestions = state.questionState.questions.map((question) => {
        if (question._id === questionId) {
          const isLiked = question.likedBy.includes(state.user._id);
          const likedBy = isLiked
            ? question.likedBy.filter(
                (userId: string) => userId !== state.user._id
              )
            : [...question.likedBy, state.user._id];
          return {
            ...question,
            likedBy,
            noOfLikes: likedBy.length,
          };
        }
        return question;
      });

      return {
        ...state,
        questionState: {
          ...state.questionState,
          questions: likedQuestions,
        },
      };
    case "SET_SEARCH_QUESTIONS":
      return {
        ...state,
        allSearch: action.payload,
      };
    case "SET_SEARCH_USERS":
      return {
        ...state,
        allUsersSearch: action.payload,
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
        fetchedAnswer: action.payload,
      };
    case "RESET_ANSWER":
      return {
        ...state,
        fetchedAnswer: initialState.fetchedAnswer,
      };
    case "PENDING_ANSWERS":
      return {
        ...state,
        pendingAnswers: action.payload,
      };
    case "UPDATE_QUESTION":
      const { payload: updatedCurrentQuestion } = action;

      return {
        ...state,
        questionState: {
          ...state.questionState,
          currentQuestion: {
            ...state.questionState.currentQuestion,
            ...updatedCurrentQuestion,
          },
        },
      };
    case "UPDATE_ANSWER":
      const { payload: updatedCurrentAnswer } = action;

      return {
        ...state,
        questionState: {
          ...state.questionState,
          currentQuestion: {
            ...state.questionState.currentQuestion,
            answers: state.questionState.currentQuestion.answers.map(
              (answer) => {
                if (answer._id === updatedCurrentAnswer._id) {
                  return {
                    ...answer,
                    ...updatedCurrentAnswer,
                  };
                }
                return answer;
              }
            ),
          },
        },
        pendingAnswers: state.pendingAnswers.map((answer) => {
          if (answer._id === updatedCurrentAnswer._id) {
            return {
              ...answer,
              ...updatedCurrentAnswer,
            };
          }
          return answer;
        }),
      };
    default:
      return state;
  }
};

export default dfReducer;
