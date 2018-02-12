import React from 'react';

import DimensionControl from './DimensionControl';
import TextControl from './TextControl';

export default class PositionControl extends React.Component {

  render() {
    if (this.props.type === 'text') {
      return (
        <TextControl value={ this.props.value } set={ this.props.set } />
      );
    } else if (this.props.type === 'dimension') {
      return (
        <div>
          <DimensionControl label="-100" delta={ -100 } value={ this.props.value } set={ this.props.set } />
          <DimensionControl label="-10" delta={ -10 } value={ this.props.value } set={ this.props.set } />
          <DimensionControl label="-1" delta={ -1 } value={ this.props.value } set={ this.props.set } />
          <DimensionControl label="0" delta={ 0 } value={ this.props.value } set={ this.props.set } />
          <DimensionControl label="1" delta={ 1 } value={ this.props.value } set={ this.props.set } />
          <DimensionControl label="10" delta={ 10 } value={ this.props.value } set={ this.props.set } />
          <DimensionControl label="100" delta={ 100 } value={ this.props.value } set={ this.props.set } />
        </div>
      );
    } else {
      return null;
    }
  }
}
