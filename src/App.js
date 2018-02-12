import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap';

import Viewer from './Viewer';
import ControlClip from './ControlClip';
import ControlPointOfView from './ControlPointOfView';
import ControlPosition from './ControlPosition';
import ModelDescriptor from './ModelDescriptor';
import ModelSelector from './ModelSelector';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      model: null,
      selection: [],
      coordinates: null,
      eyes: {
        position: [ 300, 300, 0 ],
        orientation: [ 80, 0, 0 ]
      }
    };

    this.eyes = this.eyes.bind(this);
    this.touch = this.touch.bind(this);
    this.select = this.select.bind(this);
  }

  componentDidMount() {
    $.get("/scenes/coordinates/axis").done(function(data) {
      this.state.coordinates = require('js-yaml').safeLoad(data);
      this.setState(this.state);
    }.bind(this));

    $.get("/scenes/mars/mars-colony").done(function(data) {
      this.state.model = require('js-yaml').safeLoad(data);
      this.setState(this.state);
    }.bind(this));
  }

  eyes(eyes) {
    this.state.eyes = eyes;
    this.setState(this.state);
  }

  touch(model) {
    this.setState({
      model: model
    });
  }

  select(path) {
    this.state.selection = path;
    this.setState(this.state);
  }

  getView() {
    var view = this.state.model;
    var item = this.state.model;

    if (this.state.selection && (this.state.selection.length > 0)) {
      for (var s in this.state.selection) {
        if (item != null) {
          view = item;
        }
        item = view.items[this.state.selection[s]];
      }

    }

    return view;
  }

  getSelection() {
    var item = this.state.model;

    if (this.state.selection && (this.state.selection.length > 0)) {
      item = this.getView().items[this.state.selection[this.state.selection.length - 1]];
    }

    if (!item.size) item.size = [ 100, 100, 100 ];
    if (!item.position) item.position = [ 0, 0, 0 ];
    if (!item.orientation) item.orientation = [ 0, 0, 0 ];

    return function() {
      return item;
    };
  }

  render() {
    if (!this.state.model || !this.state.coordinates) return null;

    var view = this.getView();
    var selection = this.getSelection();

    var scene = {
      label: 'Scene',
      position: this.state.eyes.position,
      orientation: this.state.eyes.orientation,
      items: view.items.concat(this.state.coordinates.items)
    }
    return (
      <Grid>
        <Row>
          <Col sm={18}>
            <Viewer model={ scene } />
          </Col>

          <Col sm={6}>
            <ModelSelector model={ this.state.model } path={ this.state.selection } select={ this.select } />
          </Col>

          <Col sm={6}>
            <div>Point of view:</div>
            <ControlPointOfView eyes={ this.state.eyes } touch={ this.eyes } />
  
            <ControlPosition model={ this.state.model } selection={ selection } property="size" index="0" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="size" index="1" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="size" index="2" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="position" index="0" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="position" index="1" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="position" index="2" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="orientation" index="0" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="orientation" index="1" touch={ this.touch } />
            <ControlPosition model={ this.state.model } selection={ selection } property="orientation" index="2" touch={ this.touch } />
            <ControlClip model={ this.state.model } selection={ selection } touch={ this.touch } />
          </Col>
        </Row>
        <Row>
          <Col sm={30}>
            <ModelDescriptor model={ selection() } />
          </Col>
        </Row>
      </Grid>
    );
  }
}

require('react-dom').render(<App />, document.getElementById('app'));
