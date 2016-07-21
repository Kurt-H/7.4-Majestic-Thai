//console.log("Hello World!");
var React = require('react');
var ReactDOM = require('react-DOM');

var MenuViewComponent = require('./components/index.jsx');


ReactDOM.render(
   React.createElement(MenuViewComponent),
   document.getElementById('app')
 );
