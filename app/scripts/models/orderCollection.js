var Backbone = require('backbone');

var OrderItem = require('./orderItem');
var MenuItem = require('./menuItem');


var  OrderCollection = Backbone.Collection.extend({
  model: OrderItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/ksorders'
});


module.exports = OrderCollection;
