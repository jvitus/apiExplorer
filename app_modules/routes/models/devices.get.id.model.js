'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  urlRoot: 'http://',
  schema: {
  },
  defaults: {
    title: 'Devices',
    verb: 'GET',
    url: '/devices/:id',
    description: 'Return informations about a device and its sensors',
    headers: 'Authorisation Bearer + token',
    requestBody: [],
    responseStatus: [
      '401: Bad credentials',
      '404: Device not found'
    ],
    responseBody: [
      'Object To details'
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