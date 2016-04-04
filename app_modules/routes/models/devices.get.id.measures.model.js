'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  urlRoot: 'http://',
  schema: {
  },
  defaults: {
    title: 'Devices measures',
    verb: 'GET',
    url: '/devices/:id/measures',
    description: 'Return a device sensors values',
    headers: 'Authorisation Bearer + token',
    requestBody: [],
    queryParams: [
      'where[]: ex. where[created_at][gt]=Timestamp or DateISO8601',
      'order_by[]: ex. order_by[field_name_1]=desc&order_by[field_name_2]=desc',
      'skip: Integer Skip the n first element of results',
      'limit: Integer Limit the number of results'
    ],
    responseStatus: [
      '400: Bad request (ex. Sort in malformated)',
      '401: Bad credentials',
      '403: Forbidden (ex. the user is not allowed to take 1000 rows)',
      '404: Device not found'
    ],
    responseBody: '\n \
    rows: [{ \n \
      "created_at": "2016-02-16T01:17:51.428Z", \n \
      "battery_carte_value": 100,\n \
      "battery_carte_threshold_min": 50,\n \
      "battery_carte_threshold_max": 150,\n \
      "distance_maxbotix_value": 100,\n \
      "distance_maxbotix_threshold_min": 50,\n \
      "distance_maxbotix_threshold_max": 150\n \
    }]',
    comment: '',
    examples: [
      {
        query: '/devices/1/measures',
        requestBody: '',
      },
      {
        query: '/devices/2/measures',
        requestBody: '',
      }
    ]
  },

  initialize: function() {
  },

});

module.exports = {
    getNewInstance: function() {
        return new Model;
    }
};