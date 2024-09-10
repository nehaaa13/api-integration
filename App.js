import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const callApi = () => {
    axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=de9606eef643c57e7da0189a1cdbebdb&language=en-US").then((response) => {
      console.log("response", response.data)
      setResults(response.data.results)
    })
  }
  useEffect(() => {
    callApi();
  }, [])

  const handleMovieSelect = (event) => {
    const selectedOption = event.target.value;
    const selectedMovie = results.find(movie => movie.original_title === selectedOption);
    setSelectedMovie(selectedMovie);
  }

  const handleMovieSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = results.filter((movie) =>
      movie.original_title && movie.original_title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="">New Hollywood Movies</h2>
      </div>
      <div className="row my-5">
        <label className="">Year:</label>
        <div className='d-flex yearButton'>
          <button className="btn-warning mx-2">2010</button>
          <button className="btn-warning mx-2">2011</button>
          <button className="btn-warning mx-2">2012</button>
          <button className="btn-warning mx-2">2013</button>
          <button className="btn-warning mx-2">2014</button>
          <button className="btn-warning mx-2">2015</button>
          <button className="btn-warning mx-2">2016</button>
          <button className="btn-warning mx-2">2017</button>
          <button className="btn-warning mx-2">2018</button>
          <button className="btn-warning mx-2">2019</button>
          <button className="btn-warning mx-2">2020</button>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-lg-4">
          <label className="">Movies:</label> &nbsp;
          <select className="form-select" onChange={handleMovieSelect}>
            {results.map(element => (
              // if(element.original_title == null){
              //   return element.original_title;
              // }
              <option key={element.id} value={element.original_title} onClick={() => { callApi() }}>{element.original_title}</option>
            ))}
          </select>
        </div>
        <div className="col-lg-3">
          <label>Search: </label> &nbsp;
          <input type="text" value={searchQuery} onChange={handleMovieSearch} ></input>
        </div>
      </div>
      <div className="row">
      {/* {(searchQuery ? filteredMovies : results).map(element => (
          <div className='col-lg-2 my-5' key={element.id}>
            <div className="card" style={{ width: '14rem' }}>
              <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">Language: {element.original_language} </p>
                <p className="card-text">Release Date: {element.release_date} </p>
                <p className="card-text">Votes: {element.vote_average}</p>
              </div>
            </div>
          </div>
        ))} */}
        {selectedMovie ? (
          <div className='col-lg-2 my-5'>
            <div className="card" style={{ width: '14rem' }}>
              <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{selectedMovie.title}</h5>
                <p className="card-text">Language: {selectedMovie.original_language} </p>
                <p className="card-text">Release Date: {selectedMovie.release_date} </p>
                <p className="card-text">Votes: {selectedMovie.vote_average}</p>
              </div>
            </div>
          </div>
        ) : (
          results.map((element => (
            <div className='col-lg-2 my-5' key={element.id}>
              <div className="card" style={{ width: '14rem' }}>
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">Language: {element.original_language} </p>
                  <p className="card-text">Release Date: {element.release_date} </p>
                  <p className="card-text">Votes: {element.vote_average}</p>
                </div>
              </div>
            </div>
          )))
        )}
          {filteredMovies.map((element) => (
            <div className='col-lg-2 my-5'>
              <div className="card" style={{ width: '14rem' }}>
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} alt="Card" />
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">Language: {element.original_language} </p>
                  <p className="card-text">Release Date: {element.release_date} </p>
                  <p className="card-text">Votes: {element.vote_average}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}



export default App;