var React = require("react"),
  Reflux = require("reflux"),
  Reqwest = require("reqwest");

var actions = Reflux.createActions(
  ['deletePerson']
);

var Store = Reflux.createStore({
  listenables: [actions],
  onDeletePerson(person) {
    this.data.people.splice(this.data.people.indexOf(person), 1);
    this.trigger(this.data);
  },
  data: { people: [] },
  init() {
    var URL = 'https://api.github.com/users/treeskelt/following';
    Reqwest({
      url: URL,
      type: 'json',
      success: (response) => {
        this.data.people = response;
        this.trigger(this.data);
      }
    });
  },
  getInitialState() {
    return this.data;
  }
});

var Person = React.createClass({
  render() {
    var github = ['http://github.com/', this.props.name].join('');
    return (
      <li>
        <div className="card">
          <div className="card-content">
            <span className="card-title deep-purple-text darken-4">
              <h6>
                <a target="_blank" href={github}>{this.props.name}</a>
              </h6>
            </span>
            <p>
              <img className="circle" src={this.props.avatar} alt={this.props.name} />
            </p>
          </div>
          <div className="card-action">
            <a className="btn waves-effect waves-light orange-text text-lighten-5" onClick={this.props.onClick}>Delete</a>
          </div>
        </div>
      </li>
    )
  }
})

var App = React.createClass({
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
