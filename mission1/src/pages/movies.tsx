// src/pages/movies.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // URL에서 category 가져오기
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

// URL의 카테고리와 API의 카테고리를 매핑하기 위한 객체
//예를 들어, URL: popular이면 API: popular로 맞춰주기
const categoryMap: Record<string, string> = {
  popular: "popular",
  upcoming: "upcoming",
  "now-playing": "now_playing",
  "top-rated": "top_rated",
};

const MoviesPage = () => {
  const { category } = useParams(); 
  //useParams() 은 URL에서 변수 꺼내는 도구
  // URL에서 값 뽑아옴
  //위 코드로 /movies/popular이라는 URL에서 popular이라는 category 값 뽑아옴
  
  // useState()는 상태(state)를 만드는 함수
  // const[현재값, 값을 바꾸는 함수]
  // state가 바뀌면 React는 자동으로 다시 그림
  const [movies, setMovies] = useState<Movie[]>([]); //상태: movies, 의미: 영화 리스트
  const [page, setPage] = useState(1); //상태:page, 의미: 현재 페이지
  const [isLoading, setIsLoading] = useState(false); //상태: isLoading, 의미: 로딩 중인지
  const [error, setError] = useState<string | null>(null); //상태: error, 의미: 에러 메시지

  // category가 없다면 기본값으로 "popular"로 설정
  const apiCategory = category ? categoryMap[category] : "popular";

  // 핵심:useEffect(데이터 가져오기) => 특정 조건일 때 실행되는 코드
  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    if (!category) return; // category가 없다면 API 호출하지 않음

    const source = axios.CancelToken.source();

    const fetchMovies = async () => {
      setIsLoading(true); //로딩 시작
      setError(null);

      //API 요청
      try { //아래 코드가 인터넷으로 요청 보내고 데이터 받아오는 코드(axios.get())
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${apiCategory}?language=ko-KR&region=KR&page=${page}&api_key=919672ed7e6f18195fe693458000a460`,
          {
            cancelToken: source.token,
          }
        );
        setMovies(data.results); // API로부터 받은 영화 데이터를 상태에 저장
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("요청 취소됨:", err.message);
        } else {
          setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
          console.error(err);
        }
      } finally {
        setIsLoading(false); //로딩 종료
      }
    };

    fetchMovies();

    return () => {
      source.cancel("컴포넌트 언마운트로 요청 취소");
    };
  }, [category, page]); // category나 page가 바뀔 때마다 useEffect가 호출되도록 설정

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{apiCategory}</h1>

      {/* 로딩 중 */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      )}

      {/* 에러 발생 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 영화 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          //movies.map() 설명
          // [1,2,3].map(x=>x*2) 이면은 2,4,6로 나옴
          //movies.map((movie => ( 이거는 영화 하나씩 꺼내서 화면에 그리라는 의미
          // movies = [영화1, 영화2, 영화3] => 카드1, 카드2, 카드3 이렇게 나옴 
          <div key={movie.id} className="relative group cursor-pointer overflow-hidden rounded-lg">
              {/*relative:내부 absolute 기준, group:hover 효과 묶기
              cursor-pointer: 마우스 포인터, overflow-hidden:넘치는거 숨김,
              rounded-lg: 모서리 둥글게 */}

            <img //영화 포스터, TMDB 이미지 규칙에 의해 씀.
            //이미지 규칙: https://image.tmdb.org/t/p/{size}{poster_path}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title} //이미지가 안 뜰 때 대신 보여줄 텍스트
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-sm"
            /> {/*w-full: width 100%, h-full: height:100%, object-cover: 이미지 비율 유지하면서 꽉 채움*/}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 text-white p-3 flex flex-col justify-end transition-all duration-300">
            {/*absolute: 이미지 위에 덮음, inset-0: 꽉 채움, bg-black/60: 반투명 검정, opacity-0 : 기본은 안 보임, hover시 100: 보이게 */}
              <h2 className="font-bold text-sm md:text-base mb-1">{movie.title}</h2>
              <p className="text-xs md:text-sm line-clamp-3">{movie.overview}</p>
              {/*제목+줄거리 보이기*/}
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          //setPage((prev)=> ...) 은 이전 값을 기반으로 업데이트
          //prev-1 은 페이지 1 감소하는데 페이지 1일때는 문제가 되므로 
          // max(prev-1,1_)로 둘 중 큰 값 선택 (최소값 1 유지)
          disabled={page === 1} //page가 1이면 클릭 막음
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          //disabled:opacity-50 이거는 비활성화되면 흐리게 라는 뜻~
        >
          이전
        </button>
        <span className="px-3 py-1 rounded bg-gray-200">{page}</span>
        <button //누르면 page 값 바뀜(다음 버튼)
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;