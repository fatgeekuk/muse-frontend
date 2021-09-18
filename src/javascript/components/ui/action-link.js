import React from 'react';
import { useDispatch } from 'react-redux';

function ActionLink(props) {
  const dispatch = useDispatch();

  return (<a href="#" onClick={() => dispatch(props.action)}>
    {props.legend}
  </a>);
}

export default ActionLink;