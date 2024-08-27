import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

    const movies = useSelector(store => store.gpt.movies);
    const movieResults = useSelector(store => store.gpt.movieResults);

    if(!movies) return null;

    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-80">
           <div>
                {movies.map((movie, index) => {<MovieList key={index} movies={movieResults[index]} title={movie} />})}
           </div>
        </div>
    );  
}

export default GptMovieSuggestion;