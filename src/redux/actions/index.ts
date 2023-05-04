import { Dispatch } from "redux";
import Cookies from "js-cookie";
import { useAppDispatch } from "../hooks";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const EDIT_AVATAR = "EDIT_AVATAR";

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
