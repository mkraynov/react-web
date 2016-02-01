/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactStyleSheet
 */
'use strict';

var StyleSheet = {
  create: function create(styles) {
    return styles;
  },
  extendCreateElement: function extendCreateElement() {},
  setReferenceWidth: null,
  rootClassName: null,
  viewClassName: null
};

module.exports = StyleSheet;