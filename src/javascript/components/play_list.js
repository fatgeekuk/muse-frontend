import React from 'react';
import { shallowEqual, useSelector, useDispatch} from 'react-redux';
import { map } from 'lodash';
import Duration from './ui/duration.js';

function PlayList() {
  const { playList, timeInTrack } = useSelector(function(state) { return { playList: state.play_list, timeInTrack: state.time_in_track } }, shallowEqual);
  const dispatch = useDispatch();
  
  let offset = -timeInTrack;
  const rows = map(playList, (track, index) => {
    const lastOffset = offset;
    offset += track.duration;
    return (<tr onClick={() => dispatch({type: 'removeTrack', value: track.id})} key={index}><td>{track.name}</td><td>artist</td><td>album</td><td className="number"><Duration seconds={track.duration} /></td><td className="number"><Duration seconds={lastOffset} /></td></tr>)
  });
  
  return (<section id="play-list">
    <h1>Play list</h1>
    <table>
      <thead>
        <tr><th>Name</th><th>Artist</th><th>Album</th><th className="number">Duration</th><th className="number">Starts</th></tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </section>);
}; 

export default PlayList;
