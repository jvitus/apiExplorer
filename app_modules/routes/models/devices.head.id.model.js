'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  urlRoot: 'http://',
  schema: {
  },
  defaults: {
    title: 'Devices',
    verb: 'HEAD',
    url: '/devices/:id',
    description: 'Check if a device exists',
    headers: 'Authorisation Bearer + token',
    requestBody: [],
    responseStatus: [
      '401: Bad credentials',
      '404: Device not found'
    ],
    responseBody: [
    ],
    comment: ''
  },

  initialize: function() {
  },

});

module.exports = {
    getNewInstance: function() {
        return new Model;
    }
};