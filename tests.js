'use strict';

var noop1 = function () {};
var noop2 = function () {};

var test = require('tape');
var mixin = require('./');
var component = Object.create(mixin);

component.props = {};
component.getDOMNode = function () {
  return document.createElement('div');
};

test('', function (assert) {
  assert.plan(7);

  component.componentDidMount();

  assert.deepEqual(component.handlers, {}, 'no handlers');
  assert.equal(component.mallet, undefined, 'no mallet instance');

  component.props.onTap = noop1;
  component.componentDidUpdate();

  assert.deepEqual(component.handlers, {tap: noop1}, 'handler registered');
  assert.ok(component.mallet, 'mallet instance');

  component.props.onTap = noop2;
  component.componentDidUpdate();

  assert.deepEqual(component.handlers, {tap: noop2}, 'handler refreshed');

  component.componentWillUnmount();

  assert.equal(component.mallet, undefined, 'undefines mallet');
  assert.equal(component.handlers, undefined, 'undefines handlers');
});
