import { useState, useCallback } from "react";

const useApi = (func = () => {}, defaultLoading = false) => {
  const [loading, setLoading] = useState(defaultLoading);

  const apiFunction = useCallback(
    async (...args) => {
      setLoading(true);
      try {
        return await func(...args);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    },
    [func],
  );

  return { loading, apiFunction };
};

export default useApi;
