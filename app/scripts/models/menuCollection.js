var Backbone = require('backbone');

var MenuItem = require('./menuItem');


var MenuCollection = Backbone.Collection.extend({
  model: MenuItem
});

module.exports = MenuCollection;
