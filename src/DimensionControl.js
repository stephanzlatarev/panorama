import React from 'react';

import {Button} from 'react-bootstrap';

export default class DimensionControl extends React.Component {

  change() {
    this.props.set((this.props.delta) ? this.props.value + this.props.delta : 0);
  }

  render() {
    return (
      <Button bsSize="xsmall" onClick={ this.change.bind(this) }>{ this.props.label }</Button>
    );
  }
}
