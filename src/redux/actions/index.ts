import Cookies from "js-cookie";
import { Answer, Question } from "../interfaces";
import "../../css/navbar.css";
import { AppDispatch } from "../store";

const API_URL = process.env.REACT_APP_BACKEND;

export const actionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  EDIT_AVATAR: "EDIT_AVATAR",
  FETCH_USER_QUESTIONS: "FETCH_USER_QUESTIONS",
  ADD_QUESTION: "ADD_QUESTION",
  ADD_ANSWER: "ADD_ANSWER",
  SET_QUESTIONS: "SET_QUESTIONS",
  FETCH_USER: "FETCH_USER",
  FETCH_USERS: "FETCH_USERS",
  FETCH_QUESTION_ANSWERS: "FETCH_QUESTION_ANSWERS",
  FETCH_ANSWER: "FETCH_ANSWER",
  RESET_ANSWER: "RESET_ANSWER",
  FETCH_USER_ANSWERS: "FETCH_USER_ANSWERS",
  SET_SEARCH_QUESTIONS: "SET_SEARCH_QUESTIONS",
  SET_SEARCH_USERS: "SET_SEARCH_USERS",
  LOGOUT_USER: "LOGOUT_USER",
  LIKE_QUESTION: "LIKE_QUESTION",
  PENDING_QUESTIONS: "PENDING_QUESTIONS",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  PENDING_ANSWERS: "PENDING_ANSWERS",
  UPDATE_ANSWER: "UPDATE_ANSWER",
};

export const setCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || "";
      const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const user = await res.json();
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
      });

      if (res.ok) {
        const users = await res.json();
        dispatch({
          type: actionTypes.FETCH_USERS,
          payload: users,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUser = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
      });

      if (res.ok) {
        const user = await res.json();
        dispatch({
          type: actionTypes.FETCH_USER,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editAvatar = (newAvatar: File, userId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || "";
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      const res = await fetch(`${API_URL}/users/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: actionTypes.EDIT_AVATAR,
          payload: data.avatar,
        });
        console.log(1);
        dispatch(fetchUsers());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: actionTypes.LOGOUT_USER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserQuestions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || "";
      const res = await fetch(`${API_URL}/questions/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const questions = await res.json();
        dispatch({
          type: actionTypes.FETCH_USER_QUESTIONS,
          payload: questions,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const newQuestion = (question: Question) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || ""; // eslint-disable-next-line
      const res = await fetch(`${API_URL}/questions/me/newQuestion`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });
      if (res.ok) {
        dispatch(setQuestions());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const likeQuestion = (questionId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = Cookies.get("accessToken") || "";

    try {
      const res = await fetch(`${API_URL}/questions/${questionId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: actionTypes.LIKE_QUESTION,
          payload: data,
        });
      } else {
        console.error("Error", res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setQuestions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/questions`);

      if (res.ok) {
        const allQuestions = await res.json();
        dispatch({
          type: actionTypes.SET_QUESTIONS,
          payload: allQuestions,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const acceptRejectQuestion = (questionId: string, status: boolean) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || "";
      const res = await fetch(`${API_URL}/questions/${questionId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updatedQuestion = await res.json();
        dispatch({
          type: actionTypes.UPDATE_QUESTION,
          payload: updatedQuestion,
        });
      }
    } catch (error) {
      console.error("Error accepting/rejecting question:", error);
    }
  };
};
export const fetchPendingQuestions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/questions?pending=true`);

      if (res.ok) {
        const allQuestions = await res.json();
        dispatch({
          type: actionTypes.PENDING_QUESTIONS,
          payload: allQuestions,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPendingAnswers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/answers?pending=true`);

      if (res.ok) {
        const allAnswers = await res.json();
        dispatch({
          type: actionTypes.PENDING_ANSWERS,
          payload: allAnswers,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const acceptRejectAnswer = (answerId: string, status: boolean) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || "";
      const res = await fetch(`${API_URL}/answers/${answerId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updatedAnswer = await res.json();
        dispatch({
          type: actionTypes.UPDATE_QUESTION,
          payload: updatedAnswer,
        });
      }
    } catch (error) {
      console.error("Error accepting/rejecting answer:", error);
    }
  };
};

export const searchQuestions = (
  searchCategory: string,
  searchQuery: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(
        `${API_URL}/questions/search?&${searchCategory}=${searchQuery}`
      );

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: actionTypes.SET_SEARCH_QUESTIONS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchUsers = (searchCategory: string, searchQuery: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(
        `${API_URL}/questions/search?&${searchCategory}=${searchQuery}`
      );

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: actionTypes.SET_SEARCH_USERS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const newAnswer = (answer: Answer, questionId: string) => {
  return async () => {
    try {
      const token = Cookies.get("accessToken") || ""; // eslint-disable-next-line
      const res = await fetch(
        `${API_URL}/answers/questions/${questionId}/newAnswer`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchQuestionAnswers = (questionId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/answers/questions/${questionId}`);

      if (res.ok) {
        const answers = await res.json();
        dispatch({
          type: actionTypes.FETCH_QUESTION_ANSWERS,
          payload: answers,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAnswer = (questionId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${API_URL}/answers/${questionId}`);

      if (res.ok) {
        const answer = await res.json();
        dispatch({
          type: actionTypes.FETCH_ANSWER,
          payload: answer,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetAnswer = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: actionTypes.RESET_ANSWER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserAnswers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = Cookies.get("accessToken") || "";
      const res = await fetch(`${API_URL}/answers/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const answers = await res.json();
        dispatch({
          type: actionTypes.FETCH_USER_ANSWERS,
          payload: answers,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
