import React from 'react';

export default class ModelSelector extends React.Component {

  list(item, path) {
    var items = [];
    if (item.items) {
      for (var i = 0; i < item.items.length; i++) {
        items.push(this.list(item.items[i], path.concat([ i ])));
      }
    }

    var style = {
      cursor: 'pointer'
    };
    if (JSON.stringify(path) === JSON.stringify(this.props.path)) {
      style.color = 'red';
    }

    return (
      <li key={ item.label }>
        <span style={ style } onClick={ function() { this.props.select(path) }.bind(this) }>
          { item.label }
        </span>
        <ul>
          { items }
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
