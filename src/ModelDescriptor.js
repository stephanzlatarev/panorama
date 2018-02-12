import React from 'react';

export default class ModelDescriptor extends React.Component {

  yaml(data, offset) {
    var text = 'label: ' + data.label + '\r\n';

    if (data.size && data.items) text += offset + 'size: [ ' + data.size[0] + ', ' + data.size[1] + ', ' + data.size[2] + ' ]\r\n';
    if (data.size && !data.items) text += offset + 'size: [ ' + data.size[0] + ', ' + data.size[1] + ' ]\r\n';
    if (data.position) text += offset + 'position: [ ' + data.position[0] + ', ' + data.position[1] + ', ' + data.position[2] + ' ]\r\n';
    if (data.orientation) text += offset + 'orientation: [ ' + data.orientation[0] + ', ' + data.orientation[1] + ', ' + data.orientation[2] + ' ]\r\n';
    if (data.texture) text += offset + 'texture: ' + data.texture + '\r\n';
    if (data.clip) text += offset + 'clip: ' + data.clip + '\r\n';

    if (data.items && data.items.length) {
      text += offset + 'items:' + '\r\n';
      for (var i in data.items) {
        text += offset + '- ' + this.yaml(data.items[i], offset + '  ');
      }
    }

    return text;
  }

  render() {
    if (!this.props.model) return null;

    return (
      <pre>
        { this.yaml(this.props.model, '') }
      </pre>
    );
  }
}
