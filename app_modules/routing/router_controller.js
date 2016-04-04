'use strict';

var Marionette = require('backbone.marionette');
var Router = require('./router');
var Main = require('../main/main.view');
var HomeView = require('../home/home.view');

module.exports = Marionette.Object.extend({
    initialize: function(options) {},

    home: function() {
        Main.getInstance().rgMain.show(HomeView.getNewInstance(), {
            preventDestroy: true
        });
    },
    
});
