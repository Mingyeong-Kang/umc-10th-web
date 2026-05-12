import { useEffect, useState } from "react";
import axios from "axios";

// 공통으로 사용할 커스텀 훅
const useCustomFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setIsError(false); // 재호출 시 에러 상태 초기화
            try {
                const response = await axios.get<T>(
                    `https://api.themoviedb.org/3${url}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                        },
                    }
                );
                setData(response.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [url]); // url이 변경될 때마다 실행

    return { data, isPending, isError };
};

export default useCustomFetch;