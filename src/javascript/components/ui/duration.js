import React from 'react';

function Duration(props) {
  const ticks = props.seconds < 0 ? 0 : props.seconds;
  const seconds = Math.floor(ticks % 60);
  const minutes = Math.floor(ticks / 60 % 60);
  const hours   = Math.floor(ticks / 3600);
  const hoursStr   = hours   == 0 ? '' : `${hours}h`;
  const minutesStr = minutes == 0 ? '' : `${minutes}m`;
  const secondsStr = seconds == 0 ? '' : `${seconds}s`;
  return (<span className="duration">{hoursStr}{minutesStr}{secondsStr}</span>);
}

export default Duration;