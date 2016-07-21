var Backbone = require('backbone');


var MenuItem = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    'item': '',
    'description': '',
    'price': '',
    'category': ''
  },
  displayPrice: function(){
    return '$' + (this.get('price')/100).toFixed(2);
  }
});

module.exports = MenuItem;
