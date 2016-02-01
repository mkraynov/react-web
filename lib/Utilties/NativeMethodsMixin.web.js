/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule NativeMethodsMixin
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _UIManager = require('UIManager');

var _UIManager2 = _interopRequireDefault(_UIManager);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _setNativePropsWeb = require('./setNativeProps.web');

var _setNativePropsWeb2 = _interopRequireDefault(_setNativePropsWeb);

var NativeMethodsMixin = {
  /**
   * Determines the location on screen, width, and height of the given view and
   * returns the values via an async callback. If successful, the callback will
   * be called with the following arguments:
   *
   *  - x
   *  - y
   *  - width
   *  - height
   *  - pageX
   *  - pageY
   *
   * Note that these measurements are not available until after the rendering
   * has been completed in native. If you need the measurements as soon as
   * possible, consider using the [`onLayout`
   * prop](/react-native/docs/view.html#onlayout) instead.
   */
  measure: function measure(callback) {
    _UIManager2['default'].measure(_reactDom2['default'].findDOMNode(this), mountSafeCallback(this, callback));
  },

  /**
   * Like [`measure()`](#measure), but measures the view relative an ancestor,
   * specified as `relativeToNativeNode`. This means that the returned x, y
   * are relative to the origin x, y of the ancestor view.
   *
   * As always, to obtain a native node handle for a component, you can use
   * `ReactDOM.findDOMNode(component)`.
   */
  measureLayout: function measureLayout(relativeToNativeNode, onSuccess, onFail) {
    _UIManager2['default'].measureLayout(_reactDom2['default'].findDOMNode(this), relativeToNativeNode, mountSafeCallback(this, onFail), mountSafeCallback(this, onSuccess));
  },

  /**
   * This function sends props straight to native. They will not participate in
   * future diff process - this means that if you do not include them in the
   * next render, they will remain active (see [Direct
   * Manipulation](/react-native/docs/direct-manipulation.html)).
   */
  setNativeProps: function setNativeProps(nativeProps) {
    (0, _setNativePropsWeb2['default'])(_reactDom2['default'].findDOMNode(this), nativeProps);
  },

  /**
   * Requests focus for the given input or view. The exact behavior triggered
   * will depend on the platform and type of view.
   */
  focus: function focus() {
    _reactDom2['default'].findDOMNode(this).focus();
  },

  /**
   * Removes focus from an input or view. This is the opposite of `focus()`.
   */
  blur: function blur() {
    _reactDom2['default'].findDOMNode(this).blur();
  }
};

/**
 * In the future, we should cleanup callbacks by cancelling them instead of
 * using this.
 */
var mountSafeCallback = function mountSafeCallback(context, callback) {
  return function () {
    if (!callback || context.isMounted && !context.isMounted()) {
      return;
    }
    return callback.apply(context, arguments);
  };
};

module.exports = { Mixin: NativeMethodsMixin };