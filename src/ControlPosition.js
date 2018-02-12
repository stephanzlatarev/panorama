import React from 'react';

import PropertyHandle from './PropertyHandle';

export default class ControlPosition extends React.Component {

  render() {
    if (!this.props.selection()) return null;

    return (
      <div>

        { this.props.property } { this.props.index }:

        <PropertyHandle model={ this.props.model } touch={ this.props.touch } selection={ this.props.selection }
          property={ this.props.property } index={ this.props.index } delta={ -100 } label="-100" />
        <PropertyHandle model={ this.props.model } touch={ this.props.touch } selection={ this.props.selection }
          property={ this.props.property } index={ this.props.index } delta={ -10 } label="-10" />
        <PropertyHandle model={ this.props.model } touch={ this.props.touch } selection={ this.props.selection }
          property={ this.props.property } index={ this.props.index } delta={ -1 } label="-1" />

        { this.props.selection()[this.props.property][this.props.index] } pixels

        <PropertyHandle model={ this.props.model } touch={ this.props.touch } selection={ this.props.selection }
          property={ this.props.property } index={ this.props.index } delta={ 1 } label="+1" />
        <PropertyHandle model={ this.props.model } touch={ this.props.touch } selection={ this.props.selection }
          property={ this.props.property } index={ this.props.index } delta={ 10 } label="+10" />
        <PropertyHandle model={ this.props.model } touch={ this.props.touch } selection={ this.props.selection }
          property={ this.props.property } index={ this.props.index } delta={ 100 } label="+100" />

      </div>
    );
  }
}
