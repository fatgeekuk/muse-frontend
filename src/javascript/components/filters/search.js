import React from 'react';
import { shallowEqual, useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

function Search() {
  const searchTerm = useSelector(function(state) { return state.filters.search }, shallowEqual);
  const dispatch = useDispatch();

  function updateSearchTerm(event) {
    dispatch({type: 'updateSearchTerm', value: event.target.value});
  }

  return(<section className="search">
    <input type="text" name="searchTerm" value={searchTerm} onChange={updateSearchTerm}/>
  </section>);
};

export default Search;