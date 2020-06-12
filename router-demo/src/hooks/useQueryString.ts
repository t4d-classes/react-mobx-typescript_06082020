

export const useQueryString = () => {
  return new URLSearchParams(window.location.search);
};