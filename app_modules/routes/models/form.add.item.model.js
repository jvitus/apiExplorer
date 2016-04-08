'use strict';

var Backbone = require('backbone');

var Model = Backbone.Model.extend({
    schema: {
      title : {type :'Text'},
      name : {type:'Number'},
      description : {type: 'Text'},
      headers : {type: 'Text'},
      reqBody : {type: 'Text'},
      resStatus : {type: 'Text'},
      resBody : {type: 'Text'},
      comment : {type: 'Text'},


  },
  defaults: {
    title : '',
    name : '',
    description : '',
    headers : '',
    reqBody : '',
    resStatus :'',
    resBody : '',
    comment : '',
  },

  initialize: function() {
  },

});

module.exports = {
    getNewInstance: function() {
        return new Model;
    }
};