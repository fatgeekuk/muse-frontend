import React from 'react';
import { map } from 'lodash';
import ActionLink from './action-link';

// a Multi Toggle list accepts three props of the following form
//
// items is an array of objects that each have a unique 'id' value and a 'name' value.
// selected is an array of the currently selected unique id values.
// action is the 'type' of the action to be fired on click. the action will be of the form
//    {
//      type: action,
//      value: id of the item.
//    }
//
function MultiToggleList(props) {
  const list = map(props.items, (item) => {
    const selectClass = props.selected.includes(item.id) ? 'selected' : '' 
    return (<li key={item.id} className={selectClass}><ActionLink legend={item.name} action={{type: props.action, value: item.id}}/></li>)
  });

  return (<ul>
    {list}
  </ul>)
}

export default MultiToggleList;