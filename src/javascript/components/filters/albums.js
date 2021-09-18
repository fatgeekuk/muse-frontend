import React from 'react';
import { shallowEqual, useSelector} from 'react-redux';
import MultiToggleList from '../ui/multi-toggle-list';
import ActionLink from '../ui/action-link';
import { filter, intersection, remove } from 'lodash';
import { useDispatch } from 'react-redux';

function Albums() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch('/api/v1/albums.json').then((res) => res.json()).then((json) => {
      console.log('albums data', json);
      dispatch({type: 'albumsReceived', values: json.albums});
    });
  }, [true]);

  const {albums, filters} = useSelector(function(state) { return {albums: state.content.albums, filters: state.filters } }, shallowEqual);
  let selectedAlbums = [...filters.albums];
  const availableAlbums = filter(albums, (album) => {
    if (filters.search != '' && (album.name || '').toUpperCase().indexOf(filters.search.toUpperCase()) == -1) return false;
    if (filters.artists.length == 0) {
      remove(selectedAlbums, (entry) => { return entry == album.id });
      return true;
    }
    if (intersection(album.artists, filters.artists).length > 0) {
      remove(selectedAlbums, (entry) => { return entry == album.id });
      return true;
    }
  });

  const selectedLabel = selectedAlbums.length == 0 ? filters.albums.length : `${filters.albums.length}*`

  const selected = filters.albums.length == 0 ? selectedLabel : (<ActionLink legend={selectedLabel} action={{type: 'clearSelectedAlbums'}}/>)


  return(<section className="albums filter">
    <h1>Albums</h1>
    <MultiToggleList items={availableAlbums} selected={filters.albums} action='toggleAlbum' />
    <span className="counts">T/F/S : {albums.length} / {availableAlbums.length} / {selected}</span>
  </section>);
};

export default Albums;