import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { Answer, Question, User } from "../interfaces";
import { AnyAction } from "@reduxjs/toolkit";

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
};

export const setCurrentUser = () => {
  return async (dispatch: Dispatch) => {
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
  return async (dispatch: Dispatch) => {
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
  return async (dispatch: Dispatch) => {
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

export const editAvatar = (newAvatar: File) => {
  return async (dispatch: Dispatch) => {
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

      const data = await res.json();
      dispatch({
        type: actionTypes.EDIT_AVATAR,
        payload: data.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ type: actionTypes.LOGOUT_USER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserQuestions = () => {
  return async (dispatch: Dispatch) => {
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
  return async () => {
    try {
      const token = Cookies.get("accessToken") || "";
      const res = await fetch(`${API_URL}/questions/me/newQuestion`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };
};

export const likeQuestion = (questionId: string) => {
  return async (dispatch: Dispatch) => {
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
  return async (dispatch: Dispatch) => {
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

export const searchQuestions = (
  searchCategory: string,
  searchQuery: string
) => {
  return async (dispatch: Dispatch) => {
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
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(
        `${API_URL}/users/search?&${searchCategory}=${searchQuery}`
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
      const token = Cookies.get("accessToken") || "";
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

      // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchQuestionAnswers = (questionId: string) => {
  return async (dispatch: Dispatch) => {
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

export const fetchAnswer = (answerId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`${API_URL}/answers/${answerId}`);

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
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: actionTypes.RESET_ANSWER });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserAnswers = () => {
  return async (dispatch: Dispatch) => {
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
