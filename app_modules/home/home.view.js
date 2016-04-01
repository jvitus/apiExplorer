'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var MenuItemView = require('../routes/menu_item.view');
var RouteItemView = require('../routes/route_item.view');

var UserPostModel = require('../routes/models/users.post.model');
var DevicesGetModel = require('../routes/models/devices.get.model');
var DevicesGetIdModel = require('../routes/models/devices.get.id.model');
var DevicesHeadIdModel = require('../routes/models/devices.head.id.model');
var DevicesPatchIdModel = require('../routes/models/devices.patch.id.model');
var DevicesGetIdMeasuresModel = require('../routes/models/devices.get.id.measures.model');


var View = Marionette.LayoutView.extend({
    template: require('./home.tpl.html'),
    className: 'full-height',

    ui: {
      'menu': '.js-menu-container',
      'routes': '.js-routes-container'
    },

    events: {
      'click .js-all': 'displayAll'
    },

    initialize: function() {
      this.initColl();
      this.initRoutes();
      this.initMenu();
    },

    displayAll: function() {
      this.collection.each(function(m){
          m.set('active', true);
      });
      this.ui.menu.find('.menu-item-view').each(function(){
        $(this).removeClass('active');
      });
    },

    initColl: function() {
      var model;
      this.collection = new Backbone.Collection();

      model = UserPostModel.getNewInstance();
      this.collection.add(model);

      model = DevicesGetModel.getNewInstance();
      this.collection.add(model);      

      model = DevicesGetIdModel.getNewInstance();
      this.collection.add(model);

      model = DevicesHeadIdModel.getNewInstance();
      this.collection.add(model);

      model = DevicesPatchIdModel.getNewInstance();
      this.collection.add(model);

      model = DevicesGetIdMeasuresModel.getNewInstance();
      this.collection.add(model);

    },

    initMenu: function() {
      var MenuView = MenuItemView.getInstance();
      this.collViewMenu = new Marionette.CollectionView({
        collection : this.collection,
        childView: MenuView,
        className: 'coll-view',
      });
    },

    initRoutes: function() {
      var RouteView = RouteItemView.getInstance();
      this.collView = new Marionette.CollectionView({
        collection : this.collection,
        childView: RouteView,
        className: 'coll-view'
      });
    },

    onShow: function() {
      this.collView.render();
      this.ui.routes.html(this.collView.el);

      this.collViewMenu.render();
      this.ui.menu.html(this.collViewMenu.el);
    },

});

module.exports = {
    getNewInstance: function() {
        return new View();
    }
};
