#!/usr/bin/env node

/* global __dirname */

import fs = require("fs");
import path = require("path");
import routingToBankname from "./src/__tests__/routing-to-bank-name.json";

const OUTPUT_PATH = path.join(__dirname, "..", "src", "routing-number-list.js");

const routingNumbers = Object.keys(routingToBankname);

let result = ["'use strict';", "", "module.exports = ["];

result = result.concat(
  routingNumbers.map(function (number, index) {
    if (index + 1 < routingNumbers.length) {
      return "  '" + number + "',";
    }

    return "  '" + number + "'";
  })
);

result = result.concat("];", "");

fs.writeFileSync(OUTPUT_PATH, result.join("\n"));
