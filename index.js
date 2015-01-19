'use strict';

var Mallet;

var supportedEvents = ['tap'];

var build = function () {
  var component = this;
  var mallet = component.mallet;
  var handlers = component.handlers || (component.handlers = {});

  supportedEvents.forEach(function (eventName) {
    var handler = component.props
      ['on' + eventName.charAt(0).toUpperCase() + eventName.slice(1)];
    var oldHandler = handlers[eventName];

    if (handler != oldHandler) {
      if (oldHandler) {
        mallet.off(eventName, oldHandler);
        handlers[eventName] = undefined;
      }

      if (handler) {
        if (!mallet) {
          // Only require mallet here, so that the module works in Node.
          if (!Mallet) {
            Mallet = require('mallet');
          }

          mallet = component.mallet =
            new Mallet(component.getDOMNode(), {
              recognizers: [[Mallet.Tap]]
            });
        }

        mallet.on(eventName, handler);
        handlers[eventName] = handler;
      }
    }
  });
};

module.exports = {
  componentDidMount: build,
  componentDidUpdate: build,

  componentWillUnmount: function () {
    var component = this;
    if (component.mallet) {
      component.mallet.destroy();
      component.mallet = component.handlers = undefined;
    }
  }
};
