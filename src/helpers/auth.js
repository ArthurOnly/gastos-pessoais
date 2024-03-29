const USER_IN_STORAGE = "user_name";

export const isAuthenticated = () => localStorage.getItem(USER_IN_STORAGE) !== null;
export const getUser = () => localStorage.getItem(USER_IN_STORAGE);
export const login = username => {
  localStorage.setItem(USER_IN_STORAGE, username);
};
export const logout = () => {
  localStorage.removeItem(USER_IN_STORAGE);
};
