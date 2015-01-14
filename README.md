# React Touch Mixin

Mixin to enable touch interactions in React components.

## Usage

```js
// myComponent.js
var react = require('react');
var touchMixin = require('react-touch-mixin');

module.exports = react.createClass({
  mixins: [touchMixin],
  render: function () {
    /* ... */
  }
});

// application.js
var react = require('react');
var myComponent = require('./myComponent');

react.render(myComponent({
  onTap: function () {
    console.log('You tapped!');
  }
}), someDOMNode);

```

**Note:** Currently only the “tap” event is supported.
