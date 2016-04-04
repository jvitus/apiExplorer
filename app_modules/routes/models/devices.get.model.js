'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  urlRoot: 'http://',
  schema: {
  },
  defaults: {
    title: 'Devices',
    verb: 'GET',
    url: '/devices',
    description: 'Return the list of devices included in the user cluster',
    headers: 'Authorisation Bearer + token',
    requestBody: [],
    responseStatus: [
      '401: Bad credentials',
    ],
    responseBody: [
    ],
    comment: 
      'It’s important to include the array of rows in an object in order to put something else in the response if necessary.'
      + 'Ex. items_total in case of pagination'
  },

  initialize: function() {
  },

});

module.exports = {
    getNewInstance: function() {
        return new Model;
    }
};