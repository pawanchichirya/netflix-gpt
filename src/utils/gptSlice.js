import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({

    name: 'gpt',
    initialState: {
        showGptSearch: false,
        movies: null,
        movieResults: null,
    },
    reducers : {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieRecommendations: (state, action) => {
            const {movies, movieResults} = action.payload;
            state.movies = movies;
            state.movieResults = movieResults;
        }
    }
});

export default gptSlice.reducer;
export const { toggleGptSearchView, addGptMovieRecommendations } = gptSlice.actions;