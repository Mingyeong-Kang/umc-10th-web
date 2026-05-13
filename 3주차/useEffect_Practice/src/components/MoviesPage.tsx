import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";


const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies)

    useEffect(() => {
        const fetchMovies = async() => {
            const {data} = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTE0MTQ1N2FjNWIwOWIyNGFhOTJjMjFjNTYwYmY4YSIsIm5iZiI6MTc3NDc5NzIyMS44NTIsInN1YiI6IjY5Yzk0MWE1ZTJhMDM5NWI1Zjg4YzgwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dSSU5EQI4fmymmfRD0cEdRfW4WT0OslBDGbP0JO9PYg`
                    },
                }
            );
            setMovies(data.results);
        };
        fetchMovies();
    }, []);

    return (
        <ul>
            {/* 옵셔널 체인 활용 */}
            {movies?.map((movie) => (
                <li key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                </li>
            ))}
        </ul>
    );
};

export default MoviesPage;
