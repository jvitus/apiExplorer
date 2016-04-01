'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var config = require('../main/config');


var View = Marionette.LayoutView.extend({
    template: require('./route_item.tpl.html'),
    className: 'route-item-view clearfix',

    events: {
        'click .js-test': 'test',
        'click .js-example': 'example',

    },

    modelEvents: {
      'change:active': 'toggle',
    },

    ui: {
        'response': '.js-response',
        'queryParams': 'input.js-query-params',
        'requestBody': 'textarea.js-request-body',
    },
    
    initialize: function() {

    },

    toggle: function() {
        if (this.model.get('active')) {
            this.$el.removeClass('hidden');
        } else {
            this.$el.addClass('hidden');
        }
    },

    test: function() {
        var queryParams = this.ui.queryParams.val();
        var requestBody = this.ui.requestBody.val() || {};
        var url = config.apiBaseURL + queryParams;
        
        var params = {
          url: url,
          method: this.model.get('verb'),
          context: this,
        };
        
        if( requestBody ) {
            params['data'] = JSON.stringify(requestBody);
        }

        this.ajax(params);
    },

    example: function(e) {
        var id = $(e.currentTarget).val();
        var url = config.apiBaseURL + this.model.get('examples')[id].query;
        var requestBody = this.model.get('examples')[id].requestBody;
        var method = this.model.get('verb');

        var params = {
          url: url,
          method: method,
          context: this,
        }

        if( requestBody ) {
            params['data'] = JSON.stringify(requestBody);
        }

        this.ajax(params);
    },

    ajax: function(params) {
        $.ajax( params ).done(function() {
            this.model.set('response', resp);
            this.ui.response.html(this.model.get('response').statusText);
        }).fail(function(resp){
            this.model.set('response', resp);
            this.ui.response.html(this.model.get('response').statusText);
        }).always(function(resp){
        });
    }
});

module.exports = {
    getNewInstance: function() {
        return new View();
    },
    getInstance: function() {
        return View;
    },
};
