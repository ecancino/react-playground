'use strict';

import React from 'react';
import Reflux from 'reflux';
import Person from './Person';
import PeopleActions from '../actions/PeopleActions';
import PeopleStore from '../stores/PeopleStore';

const People =  React.createClass({
  mixins: [Reflux.listenTo(PeopleStore, 'peopleUpdate')],
  getInitialState() {
    return { people: [] };
  },
  peopleUpdate(people) {
    this.setState({ people: people });
  },
  componentDidMount() {
    PeopleActions.loadPeople();
  },
  render() {
    const list = this.state.people.map((person, key) =>
      <Person key={person.id} name={person.login} avatar={person.avatar_url} onClick={PeopleActions.deletePerson.bind(null, person)} />
    );
    return (
      <ul id="people">{list}</ul>
    );
  }
});

export default People;
