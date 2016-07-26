var $ = require('jquery');
var React = require('react');

var OrderItem = require('../models/orderItem');
var OrderCollection = require('../models/orderCollection');
var MenuCollection = require('../models/menuCollection');


var menuList = [
  {'item': 'Steamed Fresh Basil Rolls', 'description': 'Steamed rice paper wrapped with green vegetables, vermicelli rice noodle with tamarind sauce.', 'price': 700, 'category': 'appetizers'},
  {'item': 'Chicken Satay', 'description': 'Strips of chicken breast marinated in coconut milk with a hint of curry, barbecued and served on bamboo skewers to be dipped in peanut sauce and cucumber salad.', 'price': 700, 'category': 'appetizers'},
  {'item': 'Tom-Kha-Kai', 'description': 'Sliced chicken cooked in silky coconut galangal soup, lime juice, shallots and coriander.', 'price': 600, 'category': 'soups'},
  {'item': 'Tom-Yum-Kung', 'description': 'Shrimp soup specially seasoned with lime juice, lemon grass, hot peppers and straw mushrooms.', 'price': 600, 'category': 'soups'},
  {'item': 'Masaman-Kai', 'description': 'Tender white meat chicken in masaman curry with pearl onions, potatoes, cashew nuts and green avacado.', 'price': 1500, 'category': 'entrees'},
  {'item': 'Gand-Khew-Whan', 'description': 'Chicken, beef, or pork in green curry, eggplant, cocnut milk. bamboo, green bean and fresh hot pepper and sweet basil.', 'price': 1500, 'category': 'entrees'},
  {'item': 'Khao Neeo Mamuang', 'description': 'Coconut sticky rice with mango.', 'price': 600, 'category': 'desserts'}
]

var OrderSubTotal = React.createClass({
  render: function(){
    var self = this;
    var total = this.props.subtotal;
    var formattedTotal = '$' + (total/100).toFixed(2);

    return(
      <div className="">
        <h4 className="col-md-9">Subtotal</h4>
        <h4 className="col-md-2">{formattedTotal}</h4>
        <button
          onClick={self.props.handleCancelOrder}
          type="button" className="btn btn-default col-md-3">Cancel Order</button>
        <button
          onClick={self.props.handlePlaceOrder}
          type="button" className="btn btn-default col-md-3 col-md-offset-5">Place Order</button>
      </div>
    );
  }
});

var OrderItemView = React.createClass({
  render: function(){
    var self = this;
    var price = this.props.item.get("price");
    var formattedPrice = '$' + (price/100).toFixed(2);

    return(
      <div>
        <ul className="row">
          <li>
            <h4 className="col-md-7">{this.props.item.get("item")}</h4>
            <h4 onClick={function(){console.log(self.props.item);}}
              className="col-md-2 ordered-item-price">
              {formattedPrice}
            </h4>
            <button
              onClick={function(){self.props.handleRemoveFromOrder(self.props.item);}}
              type="button" className="btn btn-default btn-xs col-md-1">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
});

var OrderListView = React.createClass({
  render: function(){
    var self = this;
    var collection = this.props.orderItems;
    var subtotal = 0;
    collection.forEach(function(item){
      subtotal += item.get('price');
    });

    var orderItemList = collection.map(function(model){
      return (
        <OrderItemView
          item={model}
          key={model.cid}
          handleRemoveFromOrder={self.props.handleRemoveFromOrder} />
      );
    });

    return(
      <div className="col-md-5">
        <h3 className="order-header">Selected Items</h3>
          {orderItemList}
        <OrderSubTotal
          subtotal = {subtotal}
          handlePlaceOrder= {this.props.handlePlaceOrder}
          handleCancelOrder={this.props.handleCancelOrder} />
      </div>
    );
  }
});

var MenuItemView = React.createClass({
  render: function(){
    // console.log(this.props.item);
    var self = this;
    var price = this.props.item.get("price");
    var formattedPrice = '$' + (price/100).toFixed(2);

    return(
      <li className="menu-item">
        <div className="row">
          <div className="col-md-10">
            <h4>{this.props.item.get("item")}</h4>
            <p>{this.props.item.get("description")}</p>
          </div>
          <h4 onClick={function(){console.log(self.props.item)}}
            className="col-md-1">
            {formattedPrice}
          </h4>
          <button
            onClick={function(){self.props.handleAddToOrder(self.props.item);}}
            type="button"
            className="btn btn-default btn-xs col-md-1 col-md-offset-1">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </div>
      </li>
    );
  }
});

var MenuListView = React.createClass({
  render: function(){
    var self = this;
    var collection = this.props.menuItems;
    // console.log(collection);
    var menuItemList = collection.map(function(model){
      return (
        <MenuItemView
          item={model}
          key={model.cid}
          handleAddToOrder={self.props.handleAddToOrder} />
      )
    });
    // console.log(menuItemList);

    return(
      <div className="col-md-7" >
        <h2 className="menu-header">Menu</h2>
        <ul>
          {menuItemList}
        </ul>
      </div>
    );
  }
});

var MenuViewComponent = React.createClass({
  getInitialState:function(){
    return {
      menuItems: new MenuCollection(),
      orderItems: new OrderCollection(),
    }
  },

  componentWillMount: function(){
    var menuItems = new MenuCollection();
    var orderItems = new OrderCollection();

    menuItems.add(menuList);

    this.setState({
      'menuItems': menuItems,
      'orderItems': orderItems,
    });
  },

  handleAddToOrder: function(model){
    var newOrderItems = this.state.orderItems;
    var orderItem = new OrderItem();

    orderItem.set('item', model.get('item'));
    orderItem.set('price', model.get('price'));

    newOrderItems.add(orderItem);
    this.setState({
      'orderItems': newOrderItems
    });
     console.warn(this.state.orderItems);
   },

  handleRemoveFromOrder: function(model){
    var removeOrderItem = this.state.orderItems;
    removeOrderItem.remove(model);
    this.forceUpdate();
    console.log(removeOrderItem);
  },

  handlePlaceOrder: function(){
    var self = this;
    var placeOrder = this.state.orderItems;
    // console.log(placeOrder);
    // placeOrder.each(function(model){
    //   model.save();
    // });

    var modelsSaved = placeOrder.map(function(model){
      return model.save();
    });
    Promise.all(modelsSaved).then(function(){
      self.handleCancelOrder();
    });
  },

  handleCancelOrder: function(){
    var orderItems = this.state.orderItems;
    // console.log(orderItems);
    orderItems.reset();
    this.forceUpdate();
  },

  render: function(){
    return(
      <div className="row">
        <header>
          <h1 className="banner">Majestic Thai</h1>
        </header>
        <section className="row">
          <MenuListView
            menuItems={this.state.menuItems}
            handleAddToOrder={this.handleAddToOrder} />
          <OrderListView
            orderItems={this.state.orderItems}
            handleRemoveFromOrder={this.handleRemoveFromOrder}
            handlePlaceOrder={this.handlePlaceOrder}
            handleCancelOrder={this.handleCancelOrder} />
        </section>
      </div>
    );
  }
});

module.exports = MenuViewComponent;
