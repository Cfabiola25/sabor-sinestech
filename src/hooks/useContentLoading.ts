import { useEffect, useState } from "react";

export const useContentLoading = (delay = 350) => {
  const [isLoading, setIsLoading] = useState(delay > 0);

  useEffect(() => {
    if (delay <= 0) {
      setIsLoading(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  return isLoading;
};