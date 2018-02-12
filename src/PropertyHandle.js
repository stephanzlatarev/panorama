import React from 'react';

import {Button} from 'react-bootstrap';

export default class PropertyHandle extends React.Component {

  change() {
    this.props.selection()[this.props.property][this.props.index] += this.props.delta;
    this.props.touch(this.props.model);
  }

  render() {
    return (
      <Button bsSize="xsmall" onClick={ this.change.bind(this) }>{ this.props.label }</Button>
    );
  }
}
