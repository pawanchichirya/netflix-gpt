import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store => store.movies?.upcomingMovies);

    const getUpcomingMovies = async () => {

        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", API_OPTIONS);
        const data = await response.json();
        //console.log(data.results);
        dispatch(addUpcomingMovies(data.results));
    }

    useEffect(() => {
        !upcomingMovies && getUpcomingMovies();
    }, [])
}

export default useUpcomingMovies;