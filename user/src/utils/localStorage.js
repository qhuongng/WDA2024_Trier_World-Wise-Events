export const sessionStorage = {
  get: (key) => {
    return window.sessionStorage.getItem(key);
  },
  set: (key, value) => {
    window.sessionStorage.setItem(key, value);
  },
  remove: (key) => {
    window.sessionStorage.removeItem(key);
  },
  clear: () => {
    window.sessionStorage.clear();
  },
};
