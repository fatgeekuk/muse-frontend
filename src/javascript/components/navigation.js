import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { map } from 'lodash';
import ActionLink from './action-link';

function Navigation(props) {
  const data = useSelector(function(state) { return state.navigation }, shallowEqual);

  const links = map(data.main, (link) => {
    return (<li key={link.key}><ActionLink legend={link.legend} action={link.action} /></li>)
  })

  const auxClasses = `aux-nav ${ data.isAuxOpen ? 'visible' : ''}`;
 

  return (<section className="navigation">

  <nav className="main-nav">
    <ul>
      {links}
      <li><ActionLink legend="More" action={{type: 'toggleAuxNav'}} /></li>
    </ul>
  </nav>
  <nav className={auxClasses}>
    <ul>
      {map(data.aux, (link) => {
        return (<li key={link.key}><ActionLink action={link.action} legend={link.legend} /></li>)
      })}
    </ul>
  </nav>
  </section>
    
);
}

export default Navigation;