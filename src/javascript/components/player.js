import React from 'react';
import { shallowEqual, useSelector} from 'react-redux';
import { isUndefined } from 'lodash';
import { useDispatch } from 'react-redux';

function trackFinished(dispatch) {
  dispatch({type: 'trackFinished'})  ;
}

function trackCurrentTime(event, dispatch) {
  dispatch({type: 'updateTimeInTrack', value: event.target.currentTime})  ;

}

function Player() {
  const dispatch = useDispatch();
  const currentTrack = useSelector(function(state) { return state.play_list[0] }, shallowEqual);

  if (isUndefined(currentTrack)) {
    return '';
  } else {
    return(<section id="player">
      <audio autoPlay controls src={currentTrack.path} onTimeUpdate={(event) => trackCurrentTime(event, dispatch)} onEnded={() => { trackFinished(dispatch) }}/>
    </section>);
  }
};

export default Player;