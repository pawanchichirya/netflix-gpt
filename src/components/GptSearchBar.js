import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import {addGptMovieRecommendations} from "../utils/gptSlice";

const GptSearchBar = () => {

    const searchedText = useRef(null);
    const language = useSelector(store => store.config.lang);
    const dispatch = useDispatch();

    const searchMovies = async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,API_OPTIONS);
        const json = await data.json();
        return json.results;
        
    }

    const handleGptSearchClick = async () => {
        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchedText.current.value +
            ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
        });

        if(!gptResults.choices) {
            // display error message
        }

        const gptMovies = gptResults.choices?.[0].message?.content.split(",");

        const promiseArray = gptMovies.map(movie => searchMovies(movie));
        const movies = Promise.all(promiseArray);
        dispatch(addGptMovieRecommendations({movies: movies, movieResults: gptMovies }));
    }

    return (
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchedText} type="text" placeholder={lang[language].gptSearchPlaceholder} className="p-4 m-4 col-span-9" />
                <button className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
                    onClick={handleGptSearchClick}
                >{lang[language].search}</button>
            </form>
        </div>
    );
};

export default GptSearchBar;