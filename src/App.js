import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap';

import Viewer from './Viewer';
import ControlPointOfView from './ControlPointOfView';
import ModelDescriptor from './ModelDescriptor';
import ModelSelector from './ModelSelector';
import PositionControl from './PositionControl';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      model: null,
      selection: {
        path: [],
        property: 'label',
        type: 'text'
      },
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

    this.load("/scenes/station/pod", function(model) {
      this.state.model = model;
      this.setState(this.state);
    }.bind(this));
  }

  load(item, callback) {
    var traverse = function(item) {
      if (item.item) {
        this.load(item.item, (model) => item.items = model.items);
      } else if (item.items) {
        for (var i in item.items) {
          traverse(item.items[i]);
        }
      }
    }.bind(this);

    $.get(item).done(function(data) {
      var model = require('js-yaml').safeLoad(data);
      traverse(model);
      callback(model);
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

  select(selection) {
    this.state.selection = selection;
    this.setState(this.state);
  }

  getView() {
    var view = this.state.model;
    if (this.state.selection.path.length) {
      for (var s = 0; s < this.state.selection.path.length - 1; s++) {
        view = view.items[this.state.selection.path[s]];
      }
    }
    return view;
  }

  getSelection() {
    var item = this.getSelectedItem();

    return function() {
      return item;
    };
  }

  getSelectedItem() {
    var item = this.state.model;

    if (this.state.selection.path.length) {
      item = this.getView().items[this.state.selection.path[this.state.selection.path.length - 1]];
    }

    if (!item.size) item.size = [ 100, 100, 100 ];
    if (!item.position) item.position = [ 0, 0, 0 ];
    if (!item.orientation) item.orientation = [ 0, 0, 0 ];

    return item;
  }

  getSelectedProperty() {
    var item = this.getSelectedItem();

    if (this.state.selection.type === 'text') {
      return item[this.state.selection.property];
    } else if (this.state.selection.type === 'dimension') {
      return item[this.state.selection.property][this.state.selection.axis];
    }
  }

  setSelectedProperty(value) {
    var item = this.getSelectedItem();

    if (this.state.selection.type === 'text') {
      item[this.state.selection.property] = value;
    } else if (this.state.selection.type === 'dimension') {
      item[this.state.selection.property][this.state.selection.axis] = value;
    }
    this.setState(this.state);
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
          <Col sm={20}>
            <Viewer model={ scene } />
          </Col>

          <Col sm={10}>
            <div>Point of view:</div>
            <ControlPointOfView eyes={ this.state.eyes } touch={ this.eyes } />
            <br />

            <div>Scene:</div>
            <ModelSelector model={ this.state.model } selection={ this.state.selection } select={ this.select } />
            <PositionControl type={ this.state.selection.type } value={ this.getSelectedProperty() } set={ this.setSelectedProperty.bind(this) } />
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
