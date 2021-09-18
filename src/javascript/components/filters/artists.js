import React from 'react';
import { shallowEqual, useSelector} from 'react-redux';
import MultiToggleList from '../ui/multi-toggle-list';
import ActionLink from '../ui/action-link';

import { filter, remove } from 'lodash';
import { useDispatch } from 'react-redux';

function Artists() {
  const { artists, filters } = useSelector(function(state) { return {artists: state.content.artists, filters: state.filters } }, shallowEqual);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch('/api/v1/artists.json').then((res) => res.json()).then((json) => {
      dispatch({type: 'artistsReceived', values: json.artists});
    });
  }, [true]);
  let selectedArtists = filters.search == '' ? [] : [...filters.artists];

  const availableArtists = filters.search == '' ? artists : filter(artists, (artist) => {
    if ((artist.name || '').toUpperCase().indexOf(filters.search.toUpperCase()) != -1) {
      remove(selectedArtists, (element) => { return element == artist.id });
      return true;
    }
  });

  const selectedLabel = selectedArtists.length == 0 ? filters.artists.length : `${filters.artists.length}*`
  const selected = filters.artists.length == 0 ? selectedLabel : (<ActionLink legend={selectedLabel} action={{type: 'clearSelectedArtists'}}/>)

  return(<section className="artists filter">
    <h1>Artists</h1>
    <MultiToggleList items={availableArtists} selected={filters.artists} action='toggleArtist' />
    <span className="counts">T/F/S :
      &nbsp;{artists.length} 
      &nbsp;/&nbsp;
      {availableArtists.length}
      &nbsp;/&nbsp; 
      {selected}    
    </span>
  </section>);
};

export default Artists;