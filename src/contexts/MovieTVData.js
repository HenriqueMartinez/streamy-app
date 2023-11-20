import { createContext, useReducer, useContext } from 'react';

const MovieTVContext = createContext();

const initialState = {
    movies: [],
    tvShows: [],
    trending: [],
    lives: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload };
        case 'SET_TVSHOWS':
            return { ...state, tvShows: action.payload };
        case 'SET_TRENDING':
            return { ...state, trending: action.payload };
        case 'SET_LIVES':
            return { ...state, lives: action.payload };
        default:
            return state;
    }
};

const MovieTVProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setMovies = (movies) => {
        dispatch({ type: 'SET_MOVIES', payload: movies });
    };

    const setTVShows = (tvShows) => {
        dispatch({ type: 'SET_TVSHOWS', payload: tvShows });
    };

    const setTrending = (trending) => {
        dispatch({ type: 'SET_TRENDING', payload: trending });
    };

    const setLives = (lives) => {
        dispatch({ type: 'SET_LIVES', payload: lives });
    };

    return (
        <MovieTVContext.Provider
            value={{
                movies: state.movies,
                tvShows: state.tvShows,
                trending: state.trending,
                lives: state.lives,
                setMovies,
                setTVShows,
                setTrending,
                setLives,
            }}
        >
            {children}
        </MovieTVContext.Provider>
    );
};

const useMovieTVContext = () => {
    const context = useContext(MovieTVContext);
    if (!context) {
        throw new Error('useMovieTVContext must be used within a MovieTVProvider');
    }
    return context;
};

export { MovieTVProvider, useMovieTVContext };
