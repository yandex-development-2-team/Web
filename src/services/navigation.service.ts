import type { NavigateFunction } from 'react-router';

let navigateFunction: NavigateFunction | null = null;

export const setNavigate = (fn: NavigateFunction) => {
  navigateFunction = fn;
};

export const navigate = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    window.location.href = path;
  }
};
