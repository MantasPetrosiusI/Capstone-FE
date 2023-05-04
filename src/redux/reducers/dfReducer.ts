import { dfState, setCurrentUser, editAvatar } from "../interfaces/index";
type Action = setCurrentUser | editAvatar;

const initialState: dfState = {
  currentUser: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
    reputation: 0,
    role: "",
  },
};

const dfReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "EDIT_AVATAR":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.payload,
        },
      };
    default:
      return state;
  }
};
export default dfReducer;
