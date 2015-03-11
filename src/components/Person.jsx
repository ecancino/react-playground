'use strict';

import React from 'react';

const Person = React.createClass({
  render() {
    const github = ['http://github.com/', this.props.name].join('');
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
});

export default Person;

