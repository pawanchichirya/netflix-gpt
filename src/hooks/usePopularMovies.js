import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(store => store.movies?.popularMovies);

    const getPopularMovies = async () => {

        const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTIONS);
        const data = await response.json();
        //console.log(data.results);
        dispatch(addPopularMovies(data.results));
    }

    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, [])
}

export default usePopularMovies;