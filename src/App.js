import React from 'react';

import Editor from './Editor';
import Loader from './Loader';
import Viewer from './Viewer';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scene: null,
      model: null,
      orientation: null
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.onOrientationChange.bind(this));
    }
  }

  load(scene) {
    new Loader().load(scene, function(model) {
      console.log('loaded', model);
      this.state.scene = scene;
      this.state.model = {
        label: 'Scene',
        position: [ 300, 300, 0 ],
        orientation: [ 80, 0, 0 ],
        items: [ {
          label: 'Beholder',
          items: [ model ]
        } ]
      };
      this.setState(this.state);
    }.bind(this));
  }

  getTool() {
    if (window.location.hash && (window.location.hash.indexOf("#/edit/") === 0)) {
      return 'edit';
    } else {
      return 'view';
    }
  }

  getScene() {
    if (window.location.hash && ((window.location.hash.indexOf("#/view/") === 0) || (window.location.hash.indexOf("#/edit/") === 0))) {
      var scene = window.location.hash.substring(7);
      if (scene.indexOf('@') > 0) {
        scene = scene.substring(0, scene.indexOf('@'));
      }
      return scene;
    } else {
      return 'boardroom/room';
    }
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

  onOrientationChange(event) {
    var orientation = [ event.gamma, event.beta, event.alpha ];
    var delta = 0;
    for (var i = 0; i < 3; i++) delta += Math.abs(orientation[i] - this.state.orientation[i]);

    if (delta > 1) {
      this.state.orientation = orientation;
      this.setState(this.state);
    }
  }

  render() {
    var tool = this.getTool();
    var scene = this.getScene();
    var orientation = this.getOrientation();

    console.log('render', tool, scene);
    if (scene === this.state.scene) {
      window.location.hash = '#/' + tool + '/' + scene + '@' + JSON.stringify(orientation);

      if (tool === 'edit') {
        return <Editor model={ this.state.model } />;
      } else {
        this.state.model.orientation = orientation;
        return <Viewer model={ this.state.model } />;
      }
    } else {
      this.load(scene);

      return <div>Loading scene { scene }...</div>
    }
  }
}

require('react-dom').render(<App />, document.getElementById('app'));
