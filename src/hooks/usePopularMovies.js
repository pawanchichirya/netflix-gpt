import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const getPopularMovies = async () => {

        const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTIONS);
        const data = await response.json();
        //console.log(data.results);
        dispatch(addPopularMovies(data.results));
    }

    useEffect(() => {
        getPopularMovies();
    }, [])
}

export default usePopularMovies;