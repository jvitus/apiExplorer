'use strict';

//    //"underscore": "./node_modules/backbone.marionette/node_modules/underscore/underscore.js",


var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    $ns = require('jquery-ns'),
    bootstrap = require('bootstrap'),
    Main = require('./main.view'),
    //moment = require('moment'),
    _ = require('lodash'),
    _ns = require('lodash-ns'),
    i18n = require('i18next-client'),
    Router = require('../routing/router');

function init() {

    $('html').addClass(document.ontouchstart === undefined ? 'notouch' : 'touch');

    // Global intercept of AJAX error
    $(document).ajaxError(function(evt, jqXhr, params, err) {
        console.log('Request failed: ' + params.url, arguments);
    });

    //for cordova
    /*    window.addEventListener('native.keyboardshow', function() {
            $('body').addClass('keyboardshow');
        });
        window.addEventListener('native.keyboardhide', function() {
            $('body').removeClass('keyboardshow');
        });
    */
    //moment.locale('fr');

    Backbone.Marionette.Renderer.render = function(template, data) {
        return template(data);
    };

    var getI18n = function() {
        var dfd = $.Deferred();
        var userLanguage = localStorage.getItem('userLanguage') || navigator.language.split('-').shift();

        i18n.init({
            getAsync: false,
            lng: userLanguage,
            fallbackLng: false,
            useCookie: false,
            resGetPath: 'data/locales/__lng__/__ns__.json'
        }, function(error, t) {
            if ( !error )
                dfd.resolve();
            else
                i18n.setLng('en');
        });

        return dfd;
    };

    var app = new Marionette.Application();
    app.on('start', function() {
        Router.getInstance();

        Main.init();
        Main.getInstance().render();

        Backbone.history.start();
    });

    getI18n().then(function() {
        app.start();
    });
}

$(document).ready(init);
