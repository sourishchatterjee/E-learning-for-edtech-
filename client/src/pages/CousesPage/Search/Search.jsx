

import React from 'react';
import './Search.css';

const Search = ({ query, setQuery }) => {
  return (
    
      <div className="container d-flex justify-content-end mt-3">
        <div className=" d-flex justify-content-end" >
          <input
            type="text"
            placeholder="Search Courses..."
            className="search-thing"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

  );
};

export default Search;
