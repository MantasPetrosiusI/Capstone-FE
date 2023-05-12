import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { Answer, Question } from "../interfaces";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const EDIT_AVATAR = "EDIT_AVATAR";
export const FETCH_USER_QUESTIONS = "FETCH_USER_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const FETCH_USER = "FETCH_USER";
export const FETCH_QUESTION_ANSWERS = "FETCH_QUESTION_ANSWERS";
export const FETCH_ANSWER = "FETCH_ANSWER";
export const RESET_ANSWER = "RESET_ANSWER";

export const setCurrentUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      let token = "";
      if (Cookies.get("accessToken")) {
        token = Cookies.get("accessToken")!;
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const user = await res.json();
        dispatch({
          type: SET_CURRENT_USER,
          payload: user,
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/${id}`, {
        method: "GET",
      });
      if (res.ok) {
        const user = await res.json();
        dispatch({
          type: "FETCH_USER",
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
      console.log(newAvatar);
      let token = "";
      if (Cookies.get("accessToken")) {
        token = Cookies.get("accessToken")!;
      }
      const formData = new FormData();
      formData.append("avatar", newAvatar);
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      dispatch({
        type: EDIT_AVATAR,
        payload: data.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchUserQuestions = () => {
  return async (dispatch: Dispatch) => {
    try {
      let token = "";
      if (Cookies.get("accessToken")) {
        token = Cookies.get("accessToken")!;
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/questions/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const questions = await res.json();
        dispatch({
          type: FETCH_USER_QUESTIONS,
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
      let token = "";
      if (Cookies.get("accessToken")) {
        token = Cookies.get("accessToken")!;
      }
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/questions/me/newQuestion`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(question),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const setQuestions = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/questions`);
      if (res.ok) {
        const allQuestions = await res.json();
        dispatch({
          type: SET_QUESTIONS,
          payload: allQuestions,
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
      console.log(questionId);
      let token = "";
      if (Cookies.get("accessToken")) {
        token = Cookies.get("accessToken")!;
      }
      console.log(questionId);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/answers/questions/${questionId}/newAnswer`,
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
export const questionAnswers = (questionId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/answers/questions/${questionId}`
      );
      if (res.ok) {
        const answers = await res.json();
        dispatch({
          type: FETCH_QUESTION_ANSWERS,
          payload: answers,
        });
      }
    } catch (error) {}
  };
};
export const fetchAnswer = (questionId: string, answerId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/answers/questions/${questionId}/${answerId}`
      );
      console.log(res);
      if (res.ok) {
        const answer = await res.json();
        dispatch({
          type: FETCH_ANSWER,
          payload: answer,
        });
      } else {
        dispatch({
          type: RESET_ANSWER,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
