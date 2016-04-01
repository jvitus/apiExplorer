'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  urlRoot: 'http://',
  schema: {
  },
  defaults: {
    title: 'Users',
    verb: 'POST',
    url: '/users/login',
    description: 'It’s the user login method',
    headers: '',
    requestBody: [],
    responseStatus: [
      '401: Bad credentials'
    ],
    responseBody: [
      '“access_token”: String, (TTL, cluster_id, ...)',
      '“fullname”: “GCZ user”',
      '“cluster_name”: String',
      '“cluster_id”: String (probably not necessary)'
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