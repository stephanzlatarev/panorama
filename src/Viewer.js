import React from 'react';

export default class Viewer extends React.Component {

  item(index, data) {
    var style = {
      display: 'block',
      position: 'absolute',
      transform: '',
      transformStyle: 'preserve-3d'
    };
    var items = [];

    if (data.texture) {
      style.backgroundImage = 'url(' + data.texture + ')';
      style.backgroundSize = '100%';
      style.width = data.size[0] + 'px';
      style.height = data.size[1] + 'px';
      style.clipPath = data.clip;
    } else {
      if (data.size) {
        style.transform += ' scale3d(' + (data.size[0] / 100) + ', ' + (data.size[1] / 100) + ', ' + (data.size[2] / 100) + ')';
      }
    }

    if (data.items) {
      for (var i in data.items) {
        items.push(this.item(i, data.items[i]));
      }
    }

    if (data.position) {
      style.transform += ' translate3d(' + data.position[0] + 'px, ' + data.position[1] + 'px, ' + data.position[2] + 'px)';
    }
    if (data.orientation) {
      style.transform += ' rotateX(' + data.orientation[0] + 'deg) rotateY(' + data.orientation[1] + 'deg) rotateZ(' + data.orientation[2] + 'deg)';
    }

    return (
      <div key={ index } style={ style }>
        { items }
      </div>
    );
  }

  render() {
    var perspective = Math.floor(Math.sqrt(
      this.props.model.position.x * this.props.model.position.x +
      this.props.model.position.y * this.props.model.position.y
    ));

    var style = {
      position: 'relative',
      perspective: perspective + 'px',
      width: '100%',
      height: '500px',
      overflow: 'hidden'
    };

    return (
      <section style={ style }>
        { this.item(0, this.props.model) }
      </section>
    );
  }
}
