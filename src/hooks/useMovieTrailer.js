import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();

    const getMovieTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();
        //console.log(json);

        const filteredData = json.results?.filter(video => video.type === "Trailer");
        const trailer = filteredData?.length ? filteredData?.[0] : json.results?.[0];
        //console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        getMovieTrailer();
    }, []);

}

export default useMovieTrailer;