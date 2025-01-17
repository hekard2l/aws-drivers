'use strict';

const pino = require('pino');
const sinon = require('sinon');
const uuid = require('uuid');

module.exports = function() {
  before(function() {
    this.sandbox = sinon.createSandbox();
    this.testContext = {
      awsRequestId: uuid.v4(),
      log: pino({ level: process.env.LOG_LEVEL || 'silent' })
    };
    this.awsPromise = value => ({
      promise() {
        return Promise.resolve(typeof value === 'function' ? value() : value);
      }
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });
};
