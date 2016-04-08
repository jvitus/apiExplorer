'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var formAddItem = require('../routes/models/form.add.item.model');

var View = Marionette.LayoutView.extend({
    template: require('./add_item.tpl.html'),
    className: 'add-item-view',

    events:{
        'submit #add-form' : 'submitForm',
    },
    ui :{
        titleFields : 'input[name=title]',
        descFields : 'input[name=description]',
        verbFields : 'input[name=verb]',
        headersFields: 'input[name=headers]',
        reqBodyFields: 'input[name=reqBody]',
        resStatusFields: 'input[name=resStatus]',
        resBodyFields: 'input[name=resBody]',
        commentFields: 'input[name=comment]',
    },
    initialize: function(options) {

    },

    submitForm: function (e){
        console.log("submit ok" );
        
        e.preventDefault();

        this.ui.titleFields.val();
        console.log("données :  \n"+
            "title :  " +this.ui.titleFields.val()+"\n"+
            "verb :  " +this.ui.verbFields.val()+"\n"+
            "description :  " +this.ui.descFields.val()+"\n"+
            "headers :  " +this.ui.headersFields.val()+"\n"+
            "reqBody :  " +this.ui.reqBodyFields.val()+"\n"+
            "resStatus :  " +this.ui.resStatusFields.val()+"\n"+
            "resBody :  " +this.ui.resBodyFields.val()+"\n"+
            "comment :  " +this.ui.commentFields.val()+"\n"
            );
        var model = formAddItem.getNewInstance();
        model.set({
            title : this.ui.titleFields.val(),
            verb :this.ui.verbFields.val(),
            description :this.ui.descFields.val(),
            headers :this.ui.headersFields.val(),
            resBody :this.ui.reqBodyFields.val(),
            resStatus:this.ui.resStatusFields.val(),
            resBody:this.ui.resBodyFields.val(),
            comment:this.ui.commentFields.val(),
        });
        //console.log(model)
        //this.collection.add(model);
    },

    onShow: function(){
        console.log('show new item ');
        this.render();
        console.log(this.$el);
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
