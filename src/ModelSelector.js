import React from 'react';

export default class ModelSelector extends React.Component {

  style(isSelected) {
    return isSelected ? { color: 'red' } : { cursor: 'pointer', color: 'black' };
  }

  dimension(item, path, property, axis) {
    return (
      <span
        style={ this.style((property === this.props.selection.property) && (axis === this.props.selection.axis)) }
        onClick={ function() { this.props.select({ path: path, property: property, axis: axis, type: 'dimension' }); }.bind(this) }>
        { item[property][axis] }
      </span>
    );
  }

  text(item, path, property) {
    var value = item[property] ? item[property] : 'none';
    return (
      <span
        style={ this.style((property === this.props.selection.property)) }
        onClick={ function() { this.props.select({ path: path, property: property, type: 'text' }); }.bind(this) }>
        { value }
      </span>
    );
  }

  list(item, path) {
    var selectItem = function() {
      this.props.select({ path: path, property: 'label' });
    }.bind(this);

    var thisPathString = path.toString();
    var selectedPathString = this.props.selection.path.toString();
    var isSelectedAsItem = (thisPathString === selectedPathString);
    var isSelectedAsParent = selectedPathString.startsWith(thisPathString);

    var children = [];
    if (isSelectedAsParent && item.items) {
      for (var i = 0; i < item.items.length; i++) {
        children.push(this.list(item.items[i], path.concat([ i ])));
      }
    }

    var properties = [];
    if (isSelectedAsItem) {
      properties.push(
        <li key='label'>
          label: { this.text(item, path, 'label') }
        </li>
      );
      properties.push(
        <li key='size'>
          size: { this.dimension(item, path, 'size', 0) } { this.dimension(item, path, 'size', 1) } { this.dimension(item, path, 'size', 2) }
        </li>
      );
      properties.push(
        <li key='position'>
          position: { this.dimension(item, path, 'position', 0) } { this.dimension(item, path, 'position', 1) } { this.dimension(item, path, 'position', 2) }
        </li>
      );
      properties.push(
        <li key='orientation'>
          orientation: { this.dimension(item, path, 'orientation', 0) } { this.dimension(item, path, 'orientation', 1) } { this.dimension(item, path, 'orientation', 2) }
        </li>
      );
      if (!item.items) {
        properties.push(
          <li key='texture'>
            texture: { this.text(item, path, 'texture') }
          </li>
        );
        properties.push(
          <li key='clip'>
            clip: { this.text(item, path, 'clip') }
          </li>
        );
      }
    }

    return (
      <li key={ item.label }>
        <span style={ { cursor: 'pointer' } } onClick={ selectItem }>
          { item.label }
        </span>
        <ul style={ { listStyleType: 'circle' } }>
          { properties }
        </ul>
        <ul style={ { listStyleType: 'disc' } }>
          { children }
        </ul>
      </li>
    );
  }

  render() {
    return (
      <ul>
        { this.list(this.props.model, []) }
      </ul>
    );
  }
}
