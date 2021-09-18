import React from 'react';
import { shallowEqual, useSelector} from 'react-redux';
import { map, filter, intersection } from 'lodash';
import MultiToggleList from './ui/multi-toggle-list';
import { useDispatch } from 'react-redux';

function addTrackToPlaylist(track, dispatch) {
  dispatch({type: 'addTrackToPlaylist', track: track});
};

function Tracks() {
  const dispatch = useDispatch();
  const {tracks, filters} = useSelector(function(state) { return {tracks: state.content.tracks, filters: state.filters } }, shallowEqual);
  const availableTracks = filter(tracks, (track) => {
    if (filters.search != '' && (track.name || '').toUpperCase().indexOf(filters.search.toUpperCase()) == -1) return false;
    if (filters.artists.length > 0 && intersection(track.artists, filters.artists).length == 0) return false;
    if (filters.albums.length > 0 && intersection(track.albums, filters.albums).length == 0) return false;
    return true;
  });

  React.useEffect(() => {
    fetch('/api/v1/tracks.json').then((res) => res.json()).then((json) => {
      dispatch({type: 'tracksReceived', values: json.tracks});
    });
  }, [true]);

  return(<section className="tracks">
    <h1>Tracks</h1>
    <ul>
      {map(availableTracks, (track) => (<li key={track.id}><a onClick={()=>addTrackToPlaylist(track, dispatch)}>{track.name}</a></li>))}
    </ul>
    <span className="counts">T/F : {tracks.length} / {availableTracks.length}</span>
  </section>);
};

export default Tracks;