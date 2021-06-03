import API from "./api";

const USER_IN_STORAGE = "user_name";

export const isAuthenticated = () => localStorage.getItem(USER_IN_STORAGE) !== null;
export const getUser = () => localStorage.getItem(USER_IN_STORAGE);
export const login = user => {
  localStorage.setItem(USER_IN_STORAGE, user.username);
};
export const logout = () => {
  localStorage.removeItem(USER_IN_STORAGE);
};
