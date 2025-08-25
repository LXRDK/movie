import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autofetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const FetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autofetch) {
      FetchData();
    }
  }, []);
  return { data, loading, error, refetch: FetchData, reset };
};

export default useFetch;
