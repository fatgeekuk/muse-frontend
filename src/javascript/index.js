console.log('in index.js');
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { filter, xor } from 'lodash';
import Search from './components/filters/search';
import Artists from './components/filters/artists';
import Albums from './components/filters/albums';
import Tracks from './components/tracks';
import Player from './components/player';
import PlayList from './components/play_list';

const initialState = {
  play_list: [],
  time_in_track: 0,
  filters: {
    search: '',
    artists: [],
    albums: []
  },
  content: {
    artists: [],
    albums: [],
    tracks: []
  }
}

function rootReducer(state={}, action) {
  console.log('original State', state);
  console.log('action', action);

  switch(action.type) {
    case 'clearSelectedAlbums': {
      return {
        ...state,
        filters: {
          ...state.filters,
          albums: []
        }
      }
    }
    case 'clearSelectedArtists': {
      return {
        ...state,
        filters: {
          ...state.filters,
          artists: []
        }
      }
    }
    case 'removeTrack': {
      return {
        ...state,
        play_list: filter(state.play_list, (track) => track.id != action.value)
      }
    }
    case 'tracksReceived': {
      return {
        ...state,
        content: {
          ...state.content,
          tracks: action.values
        }
      }
    }
    case 'albumsReceived': {
      return {
        ...state,
        content: {
          ...state.content,
          albums: action.values
        }
      }
    }
    case 'artistsReceived': {
      return {
        ...state,
        content: {
          ...state.content,
          artists: action.values
        }
      }
    }
    case 'updateTimeInTrack': {
      return {
        ...state,
        time_in_track: action.value
      }
    }
    case 'trackFinished': {
      return {
        ...state,
        play_list: state.play_list.slice(1)
      }
    }
    case 'addTrackToPlaylist': {
      return {
        ...state,
        play_list: [...state.play_list, action.track]
      }
    }
    case 'toggleArtist': {
      return {
        ...state,
        filters: {
          ...state.filters,
          artists: xor(state.filters.artists, [action.value])
        }
      }
    }
    case 'toggleAlbum': {
      return {
        ...state,
        filters: {
          ...state.filters,
          albums: xor(state.filters.albums, [action.value])
        }
      }
    }
    case 'updateSearchTerm': {
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.value
        }
      }
    }
    case 'toggleAuxNav': {
      return {
        ...state,
        navigation: {
          ...state.navigation,
          isAuxOpen: !state.navigation.isAuxOpen
        }
      }
    }
    default:
      return state
  }

  return state;
}

const store = createStore(rootReducer, initialState);

function App() {
  return (
  <Provider store={store}>
    <div>
      <div className="top-bar">
        <Search />
        <Player />
      </div>
      <div className="columns">
        <Artists/>
        <Albums/>
        <Tracks/>
        <PlayList/>
      </div>
    </div>
  </Provider>);
}

ReactDOM.render(<App />, document.getElementById('root'));
