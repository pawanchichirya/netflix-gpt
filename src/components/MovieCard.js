import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({moviePoster}) => {
    if(!moviePoster) return null;
    return (
        <div className="w-44 pr-4">
            <img src={`${IMG_CDN_URL}${moviePoster}`} alt="movie poster" />
        </div>
    );
}

export default MovieCard