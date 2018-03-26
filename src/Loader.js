import React from 'react';

export default class Loader {

  load(scene, callback) {
    $.get("/scenes/" + scene).done(function(data) {
      var model = require('js-yaml').safeLoad(data);
      var progress = function() {
        callback(model);
      }

      this.traverseItem(model, progress);
      callback(model);
    }.bind(this));
  }

  traverseItem(item, progress) {
    if (item.item) {
      this.fetchItem(item.item, (model) => item.items = model.items, progress);
    } else if (item.items) {
      for (var i in item.items) {
        this.traverseItem(item.items[i], progress);
      }
    }
  }

  fetchItem(item, handle, progress) {
    $.get(item).done(function(data) {
      var model = require('js-yaml').safeLoad(data);
      this.traverseItem(model, progress);
      handle(model);
      progress();
    }.bind(this));
  }

}
