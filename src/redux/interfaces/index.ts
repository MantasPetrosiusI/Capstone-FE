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
  };
}

export interface setCurrentUser {
  type: "SET_CURRENT_USER";
  payload: User;
}
export interface editAvatar {
  type: "EDIT_AVATAR";
  payload: string;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  reputation: number;
  role: string;
}
