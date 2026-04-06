import { useEffect, useState } from "react";
import axios from "axios";

const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await axios.get<T>(
          `https://api.themoviedb.org/3${url}${url.includes("?") ? "&" : "?"}api_key=${import.meta.env.VITE_TMDB_KEY}&language=ko-KR`,
        );

        setData(response.data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;
