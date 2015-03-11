jest.autoMockOff();

import React from 'react/addons';
import Person from '../components/Person';
let TestUtils = React.addons.TestUtils;

describe('Person', function () {
  let person, element, node;

  beforeEach(function() {
    person = TestUtils.renderIntoDocument(
      <Person key="1" name="treeskelt" avatar="http://placehold.it/122x122" onClick={console.log.bind(null, 'Person')} />
    );
    element = TestUtils.findRenderedDOMComponentWithClass(person, 'card');
    node = element.getDOMNode();
  });

  it('creates a component', function () {
    expect(node.className).toEqual('card');
  });

});
