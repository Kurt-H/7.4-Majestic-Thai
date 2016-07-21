var Backbone = require('backbone');


var OrderItem = Backbone.Model.extend({
  defaults: {
    'item': '',
    'price': ''
  }
});

module.exports = OrderItem;
