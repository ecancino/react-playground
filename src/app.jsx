'use strict';

import React from 'react';
import Reflux from 'reflux';
import Reqwest from 'reqwest';
import Person from './components/Person';

let actions = Reflux.createActions(
  ['deletePerson']
);

let Store = Reflux.createStore({
  listenables: [actions],
  onDeletePerson(person) {
    this.data.people.splice(this.data.people.indexOf(person), 1);
    this.trigger(this.data);
  },
  data: { people: [] },
  init() {
    let that = this;
    var URL = 'https://api.github.com/users/treeskelt/following';
    Reqwest({
      url: URL,
      type: 'json',
      success(response) {
        that.data.people = response;
        that.trigger(that.data);
      }
    });
  },
  getInitialState() {
    return this.data;
  }
});



let App = React.createClass({
  mixins: [Reflux.connect(Store)],
  render() {
    return (
      <ul id="people">
        {this.state.people.map(person => {
          return (<Person key={person.id} name={person.login} avatar={person.avatar_url} onClick={actions.deletePerson.bind(null, person)} />);
        })}
      </ul>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
