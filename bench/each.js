'use strict';

var _ = require('lodash');
var comparator = require('func-comparator');
var pasync_origin = require('pasync');
var pasync_current = require('../lib');

var Promise = require('es6-promise').Promise;

// loop count
var count = 100;
// sampling times
var times = 10000;
var array = _.shuffle(_.times(count));
var iterator = function(n) {
  return new Promise(function(resolve) {
    resolve();
  });
};
var func = {
  'origin': function(callback) {
    pasync_origin.each(array, iterator).then(callback);
  },
  'current': function(callback) {
    pasync_current.each(array, iterator).then(callback);
  }
};

comparator
  .set(func)
  .async()
  .times(times)
  .start()
  .result(function(err, res) {
    console.log(res);
  });

