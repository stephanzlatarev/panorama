import React from 'react';

import Editor from './Editor';
import Loader from './Loader';
import Viewer from './Viewer';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: 'no device orientation',
      scene: null,
      model: null,
      baseOrientation: [0, 0, 0],
      orientation: null,
      width: 600,
      height: 500
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.onOrientationChange.bind(this));
      this.state.message = 'device orientation listener registered';
    }
  }

  componentDidMount() {
    this.state.width = $(window).width() - 1;
    this.state.height = $(window).height() - 1;
    this.setState(this.state);
  }

  load(scene) {
    new Loader().load(scene, function(model) {
      this.state.scene = scene;
      this.state.model = {
        label: 'Scene',
        position: [ 0, 0, 0 ],
        orientation: [ 0, 0, 0 ],
        items: [ model ]
      };
      this.setState(this.state);
    }.bind(this));
  }

  getTool() {
    if (window.location.hash) {
      if (window.location.hash.indexOf("#/edit/") === 0) {
        return 'edit';
      } else if (window.location.hash.indexOf("#/vr/") === 0) {
        return 'vr';
      }
    }

    return 'view';
  }

  getScene() {
    var scene = 'boardroom/room';
    if (window.location.hash) {
      var scene = window.location.hash.substring(this.getTool().length + 3);
    }

    if (scene.indexOf('@') > 0) {
      scene = scene.substring(0, scene.indexOf('@'));
    }
    return scene;
  }

  getOrientation() {
    if (this.state.orientation) {
      return this.state.orientation;
    } else if (window.location.hash && (window.location.hash.indexOf("@") > 0)) {
      return JSON.parse(window.location.hash.substring(window.location.hash.indexOf("@") + 1));
    } else {
      return [ 0, 0, 0 ];
    }
  }

  getOrientationText() {
    var orientation = this.getOrientation();
    return '[' + Math.round(orientation[0]) + ',' + Math.round(orientation[1]) + ',' + Math.round(orientation[2]) + ']';
  }

  onOrientationChange(event) {
    if (!event || !event.alpha || !event.beta || !event.gamma) return;

    var orientation = [ event.gamma, event.beta - 90 * Math.sign(event.gamma), event.alpha ];
    var delta;
    if (this.state.orientation) {
      delta = 0;
      for (var i = 0; i < 3; i++) delta += Math.abs(orientation[i] - this.state.orientation[i]);
    } else {
      delta = 100;
    }

    this.state.message = 'orientation: ' + this.getOrientationText() + ' delta: ' + delta;
    if (delta > 1) {
      this.state.orientation = orientation;
      this.setState(this.state);
    }
  }

  setBaseOrientation() {
    if (this.state.orientation) {
      this.state.baseOrientation = JSON.parse(JSON.stringify(this.state.orientation));
      this.setState(this.state);
    }
  }

  render() {
    var tool = this.getTool();
    var scene = this.getScene();
    var orientation = this.getOrientation();

    if (scene === this.state.scene) {
      window.location.hash = '#/' + tool + '/' + scene + '@' + this.getOrientationText();

      if (tool === 'edit') {
        return <Editor model={ this.state.model } />;
      } else if (tool === 'view') {
        this.state.model.orientation = orientation;
        return (
          <Viewer model={ this.state.model } width={ this.state.width } height={ this.state.height } />
        );
      } else if (tool === 'vr') {
        this.state.model.orientation = orientation;
        var left = JSON.parse(JSON.stringify(this.state.model));
        left.position[1] += 20;
        var right = JSON.parse(JSON.stringify(this.state.model));
        right.position[1] -= 20;
        return (
          <table>
            <tbody>
              <tr>
                <td>
                  <Viewer model={ left } width={ this.state.width } height={ this.state.height / 2 } />
                </td>
              </tr>
              <tr>
                <td>
                  <Viewer model={ right } width={ this.state.width } height={ this.state.height / 2 } />
                </td>
              </tr>
            </tbody>
          </table>
        );
      } else {
        return <div>Unsupported tool { tool }...</div>
      }
    } else {
      this.load(scene);

      return <div>Loading scene { scene }...</div>;
    }
  }
}

require('react-dom').render(<App />, document.getElementById('app'));
