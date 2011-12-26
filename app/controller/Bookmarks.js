Ext.define("GlossMobile.controller.Bookmarks", {
    extend: "Ext.app.Controller",
    models: ["Bookmark"],
    stores: ["Bookmarks"],
    views: ["bookmarks.ListView"],
    refs: [
        {ref: "bookmarks", selector: "bookmarks"},   
    ],
    init: function(){
        this.control({
            "bookmarks": {
                itemtap: function(list,index,item,e,opts) {
                    if(!list.getLocked()) {
                        var record = list.getStore().getAt(index);
                        this.application.getController("Navigation").find(record.get('target'),record.get('type'))
                        list.deselect(record)
                    }
                }
            }
        });
    },
    addbookmark: function(target,title,type) {
        var store = this.getBookmarksStore();
        if(store.find("target",target)==-1) {
            var dt = new Date();
            var date = Ext.Date.format(dt,'Y-m-d g:i a');
            var record = Ext.create("GlossMobile.model.Bookmark",{
                target: target,
                title: title,
                type: type,
                created: date
            });
            store.add(record);
            store.sort('title','ASC')
        }
    },
    hasbookmark: function(target) {
        return this.getBookmarksStore().find("target",target)==-1 ? false : true;
    }
});