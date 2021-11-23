import { UserData } from "interfaces/user.type";
import { ActionTypes } from "../actions/types";

interface IninitialState extends UserData {
  isLoggedIn: boolean;
}

type Action<T> = { type: string; payload: T };

const token = localStorage.getItem("token");
const userData = localStorage.getItem("userData");
const { email, _id, name } = userData
  ? JSON.parse(userData)
  : {
      _id: "",
      email: "",
      name: "",
    };

const initialState: IninitialState = {
  _id,
  name,
  email,
  dateCreated: "",
  details: "",
  extra_details: "",
  profession: "",
  skills: "",
  avatar: "",
  isLoggedIn: !!token,
};

const authReducer = (state = initialState, action: Action<UserData>) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
