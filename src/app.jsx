'use strict';

import React from 'react';
import Reflux from 'reflux';
import People from './components/People';

let App = React.createClass({
  render() {
    return (
      <People />
    );
  }
});

React.render(<App/>, document.getElementById('app'));
