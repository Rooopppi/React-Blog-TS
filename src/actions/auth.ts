import { UserData } from "interfaces/user.type";
import { Dispatch } from "react";
import { ActionTypes } from "./types";
import { setToStorage } from "../utils/global";
import AuthService from "../api/auth-service";

interface Auth {
  type: string;
  payload?: UserData | { token: string };
}

export const register =
  (email: string, password: string, name: string): any =>
  (dispatch: Dispatch<Auth>) => {
    return AuthService.register(email, password, name).then(
      () => {
        dispatch({
          type: ActionTypes.REGISTER_SUCCESS,
        });
        return Promise.resolve();
      },
      () => {
        dispatch({
          type: ActionTypes.REGISTER_FAIL,
        });

        return Promise.reject();
      }
    );
  };

export const login =
  (email: string, password: string) => (dispatch: Dispatch<Auth>) => {
    return AuthService.login(email, password).then(
      (response) => {
        setToStorage("token", response.data.token);
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve();
      },
      () => {
        dispatch({
          type: ActionTypes.LOGIN_FAIL,
        });

        return Promise.reject();
      }
    );
  };

export const getUser = () => (dispatch: Dispatch<Auth>) => {
  return AuthService.getUser().then(
    (response) => {
      setToStorage(
        "userData",
        JSON.stringify({
          // eslint-disable-next-line no-underscore-dangle
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
        })
      );
      dispatch({
        type: ActionTypes.GET_USER_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve();
    },
    () => {
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch: Dispatch<Auth>) => {
  AuthService.logout();

  dispatch({
    type: ActionTypes.LOGOUT,
  });
};
