import React from 'react';

import {Button} from 'react-bootstrap';

export default class ControlPointOfView extends React.Component {

  componentWillMount() {
    this.setState({
      rotation: {
        x: 0,
        y: 0,
        z: 45
      }
    });

    setTimeout(this.rotate.bind(this), 100);
  }

  rotate() {
    if (this.state.rotation.z) {
      var velocity = (this.state.rotation.z < 100) ? 1 : 10;
      var timeout = 1000 * velocity / this.state.rotation.z;
  
      this.props.eyes.orientation[2] += velocity;
      this.props.touch(this.props.eyes);
  
      setTimeout(this.rotate.bind(this), timeout);
    }
  }

  onDecreaseRotationZ() {
    if (this.state.rotation.z >= 20) {
      this.state.rotation.z /= 2;
      this.setState(this.state);
    } else if (this.state.rotation.z > 0) {
      this.state.rotation.z = 0;
      this.setState(this.state);
    }
  }

  onIncreaseRotationZ() {
    if (this.state.rotation.z <= 0) {
      this.state.rotation.z = 10;
      this.setState(this.state);

      setTimeout(this.rotate.bind(this), 0);
    } else if (this.state.rotation.z <= 360) {
      this.state.rotation.z *= 2;
      this.setState(this.state);
    }
  }

  render() {
    return (
      <div>
        Rotation Z:
        <Button bsSize="xsmall" onClick={ this.onDecreaseRotationZ.bind(this) }>-</Button>
        { this.state.rotation.z } deg/sec
        <Button bsSize="xsmall" onClick={ this.onIncreaseRotationZ.bind(this) }>+</Button>
      </div>
    );
  }
}
