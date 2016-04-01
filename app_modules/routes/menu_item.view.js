'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

var View = Marionette.LayoutView.extend({
    template: require('./menu_item.tpl.html'),
    className: 'menu-item-view',

    events: {
        'click': 'active'
    },

    modelEvents: {
      'change:active': 'toggle',
    },
    
    initialize: function(options) {

    },

    toggle: function() {
        if(this.model.get('active')) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    },

    active: function(){
        this.model.collection.each(function(m){
            m.set('active', false);
        });
        this.model.set('active', true);
    },
});

module.exports = {
    getNewInstance: function() {
        return new View();
    },
    getInstance: function() {
        return View;
    },
};
