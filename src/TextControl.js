import React from 'react';

import {FormControl} from 'react-bootstrap';

export default class TextControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state.value = props.value;
    this.setState(this.state);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    this.props.set(event.target.value);
  }

  render() {
    return (
      <div>
        <FormControl
          type="text"
          style={ { width: '90%' } }
          value={ this.state.value }
          onChange={ this.handleChange }
        />
      </div>
    );
  }

}
