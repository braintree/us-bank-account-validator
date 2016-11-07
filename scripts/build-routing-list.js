#!/usr/bin/env node
'use strict';

/* global __dirname */

var fs = require('fs');
var path = require('path');
var routingToBankname = require('../test/routing-to-bank-name');

var OUTPUT_PATH = path.join(__dirname, '..', 'src', 'routing-number-list.js');

var routingNumbers = Object.keys(routingToBankname);

var result = [
  "'use strict';",
  '',
  'module.exports = ['
];

result = result.concat(routingNumbers.map(function (number, index) {
  if (index + 1 < routingNumbers.length) {
    return "  '" + number + "',";
  }
  return "  '" + number + "'";
}));

result = result.concat('];', '');

fs.writeFileSync(OUTPUT_PATH, result.join('\n'));
