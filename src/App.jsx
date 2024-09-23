import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const match = useSelector((state) => state.football);
  const dispatch = useDispatch();

  const matchRequest = (page) => {
    dispatch({ type: 'REQUEST' });
    fetch(`https://jsonmock.hackerrank.com/api/football_matches?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        let obj = data.data;
        dispatch({ type: 'SUCCESS', payload: obj });
      })
      .catch((error) => {
        dispatch({ type: 'FAILURE', payload: error.message });
      });
  };

  useEffect(() => {
    matchRequest(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {match.isLoading && <div>Loading...</div>}
      {match.isError && <div>Error fetching data.</div>}
      <h1 style={{textAlign: 'center'}}>FootBall Match Result</h1>
      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage}>Next</button>
      </div><br />
      <div className='container'>
        {match.footballMatches.map((match) => (
          <div key={match.id} className='card'>
            <h2>{match.competition}</h2>
            <h3>{match.round}</h3>
            <h4>Team 1 : {match.team1} - {match.team1goals}</h4>
            <h4>Team 2 : {match.team2} - {match.team2goals}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
