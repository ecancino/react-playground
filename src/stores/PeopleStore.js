'use strict';

import Reflux from 'reflux';
import PeopleActions from '../actions/PeopleActions';

const PeopleStore = Reflux.createStore({
  listenables: [PeopleActions],
  list: [],
  getInitialState() {
    return this.list;
  },
  onDeletePerson(person) {
    this.list.splice(this.list.indexOf(person), 1);
    this.trigger(this.list);
  },
  onStackPeople(people) {
    this.list = people;
    this.trigger(this.list);
  }
});

export default PeopleStore;

