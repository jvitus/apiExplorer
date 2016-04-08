'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

var View = Marionette.LayoutView.extend({
    template: require('./menu_item.tpl.html'),
    className: 'menu-item-view',

    ui :{
        button: '.btnRemove'
    },

    events: {
        'click': 'active',
        'click @ui.button' :'btnErase',
        
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
    btnErase : function(){
        console.log("on efface cette donnée "+this.model.get('title'));

        this.model.destroy();
        
        /*var test = this.model.get('title');
        console.log("on va effacer cette item"+test);
        var modelEfface = this.model.collection.remove(test);
        console.log("on a effacé :"+modelEfface);*/
       // this.model.collection.remove(this.model.get('title'));

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
