import { useState, useEffect } from "react";

export function useMyFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setData(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((text) => {
        setData(text);
        setIsLoading(false);
        console.log(text);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);
  return { isLoading, error, data };
}
