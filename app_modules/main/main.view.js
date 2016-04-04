'use strict';

var Marionette = require('backbone.marionette');
var _ = require('lodash');
var $ = require('jquery');
var i18n = require('i18next-client');
var Header = require('../header/header.view'); 
var Sidenav = require('../sidenav/sidenav.view');

var MainRegion = Marionette.Region.extend({
    attachHtml: function(view) {
        //TODO: another place for that ?
        if ( this.$el.children('div').length && this.currentView ) {
            var last = this.currentView;
            var $last = last.$el;
            $last.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                if ( $last.hasClass('animate-close') ) {
                    $('body').alterClass('section-*', 'section-'+ view.name);
                    $last.removeClass('animate animate-close');
                    last.destroy();
                }
            });
            $last.addClass('animate animate-close');
        } else
            $('body').alterClass('section-*', 'section-'+ view.name);

        var headerData = _.clone(view.header||{});
        if ( _.isPlainObject(headerData) && _.isUndefined(headerData.title) )
            headerData.title = i18n.t('pages.'+view.name+'.title');
        Header.getInstance().set(headerData);

        this.$el.prepend(view.el);
        //Marionette.Region.prototype.attachHtml.apply(this, arguments);
    }
});

var Layout = Marionette.LayoutView.extend({
    el: 'body',
    template: require('./main.tpl.html'),
    className: 'ns-full-height',

    initialize: function() {
    },

    regions: {
        rgHeader: 'header',
        rgSidenav: 'aside',
        rgMain: new MainRegion({
            el: 'main'
        }),
        rgFooter: 'footer'
    },

    render: function(options) {
        Marionette.LayoutView.prototype.render.apply(this, options);
        this.rgHeader.show(Header.getInstance());
        //this.rgSidenav.show(Sidenav.getInstance());

    }
});

var instance = null;

module.exports = {
    init: function() {
        if ( instance ) {
            console.log('An instance still exists');
        } else {
            instance = new Layout();
        }
    },
    getInstance: function() {
        if ( !instance ) {
            console.log('You have to call init() first');
            return null;
        }
        return instance;
    }
};
