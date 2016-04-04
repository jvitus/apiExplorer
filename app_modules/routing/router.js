'use strict';

var Marionette = require('backbone.marionette');

var Router = Marionette.AppRouter.extend({
    appRoutes: {
        '*route(/:page)': 'home',
    },
});

var instance = null;

module.exports = {
    getInstance: function() {
        if (!instance)
            instance = new Router({
                controller: new(require('./router_controller'))()
            });
        return instance;
    }
};
