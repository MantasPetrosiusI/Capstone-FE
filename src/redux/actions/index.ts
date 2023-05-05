import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { Question } from "../interfaces";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const EDIT_AVATAR = "EDIT_AVATAR";
export const FETCH_USER_QUESTIONS = "FETCH_USER_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SET_QUESTIONS = "SET_QUESTIONS";

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
export const logout = () => {
  return {
    type: "LOGOUT",
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
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/me/questions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        `${process.env.REACT_APP_BACKEND}/users/me/newQuestion`,
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
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/questions`
      );
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
