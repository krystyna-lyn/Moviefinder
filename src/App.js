import { useEffect, useState } from 'react'
import './App.css';
import searchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = `http://www.omdbapi.com/?apikey=` + process.env.REACT_APP_API_KEY;


const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchterm] = useState('')

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovie('Game')
    }, [])



    return (
        <div className='app'>
            <h1>Film Findr</h1>

            <div className='search'>
                <input
                    placeholder='type a title and press search button'
                    value={searchTerm}
                    onChange={(e) => setSearchterm(e.target.value)}
                />
                <img src={searchIcon}
                    alt='search'
                    onClick={() => searchMovie(searchTerm)} />
            </div>

            {movies?.length > 0
                ? (
                    <div className='container'>
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))
                        }

                    </div>
                ) : (
                    <div className='empty'>
                        <h1>No movies found..</h1>
                    </div>
                )
            }


        </div>
    )
}

export default App