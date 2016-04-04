'use strict';

var Marionette = require('backbone.marionette');
var Header = require('../header/header.view');
var $ = require('jquery');
var i18n = require('i18next-client');

var View = Marionette.LayoutView.extend({
    template: require('./sidenav.tpl.html'),
    className: 'inner',
    events: {
        'click': 'hide',
    },

    initialize: function() {
        var router = require('../routing/router').getInstance();
        this.listenTo(router, 'route', this.updateActiveItems);

        this.listenTo(Header.getInstance(), 'btn:menu:click', this.toggleShow);
    },

    clearActiveItems: function() {
        this.$el.find('ul.js-main-nav li.active').removeClass('active');
    },

    updateActiveItems: function(name, args) {
            this.clearActiveItems();
            //this.$el.find('ul.js-main-nav li').eq(parseInt(args) || 0).addClass('active');
    },

    serializeData: function() {
        return {
            title: '',
            navBtns: []
        };
    },

    toggleShow: function() {
        $('body').toggleClass('show-sidenav');
    },

    show: function() {
        $('body').addClass('show-sidenav');
    },

    hide: function() {
        $('body').removeClass('show-sidenav');
    },

});

var instance = null;

module.exports = {
    getInstance: function() {
        if ( !instance )
            instance = new View();
        return instance;
    }
};
