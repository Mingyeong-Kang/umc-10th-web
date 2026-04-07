import { useEffect, useState } from "react";
import axios from "axios";

const useCustomFetch = <T,>(url: string, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axios.get<T>(url);
        setData(res.data);
      } catch (err) {
        setError("😢데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, isLoading, error };
};

export default useCustomFetch;