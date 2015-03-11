'use strict';

import Reflux from 'reflux';
import Reqwest from 'reqwest';

let PeopleActions = Reflux.createActions([
  'deletePerson',
  'loadPeople',
  'stackPeople',
]);

PeopleActions.loadPeople.listen(function () {
  Reqwest({
    url: 'https://api.github.com/users/treeskelt/following',
    type: 'json',
    success(following) {
      PeopleActions.stackPeople(following);
    }
  });
});

export default PeopleActions;
