'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  urlRoot: 'http://',
  schema: {
  },
  defaults: {
    title: 'Devices',
    verb: 'PATCH',
    url: '/devices/:id',
    description: 'Update a device and its sensors',
    headers: 'Authorisation Bearer + token',
    requestBody: [
      'Object (to detail)'
    ],
    responseStatus: [
      '401: Bad credentials',
      '404: Device not found',
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