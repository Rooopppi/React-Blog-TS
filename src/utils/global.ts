export const getFromStorage = (key: string) => {
  return localStorage.getItem(key) || null;
};

export const setToStorage = (keyName: string, key: string) => {
  localStorage.setItem(keyName, key);
};
