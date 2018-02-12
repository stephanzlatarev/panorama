import React from 'react';

import {FormControl} from 'react-bootstrap';

export default class ControlClip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    this.props.selection().clip = event.target.value;
    this.props.touch(this.props.model);
  }

  render() {
    if (!this.props.selection()) return null;

    return (
      <div>
        Clip:

        <FormControl
          type="text"
          style={ { width: '90%' } }
          value={ this.state.value }
          placeholder="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          onChange={ this.handleChange }
        />
      </div>
    );
  }

}
