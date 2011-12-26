Ext.define("GlossMobile.controller.Search", {
    extend: "Ext.app.Controller",
    models: ["Search"],
    stores: ["Search"],
    views: ["search.ListView"],
    refs: [
        {ref: "search", selector: "search"},   
    ],
    init: function(){
        this.control({
            "search": {
                itemtap: function(list,index,item,e,opts) {
                    var record = list.getStore().getAt(index);
                    this.application.getController("Navigation").find(record.get('target'),record.get('type'))
                    list.deselect(record)
                }
            },
            "searchfield": {
                keyup: function(fld,e,opts){
                    var val = fld.getValue();
                    if(val.length >=3) {
                        this.getSearchStore().getProxy().setExtraParam("query",val)
                        this.getSearchStore().load()
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
        }
    },
    hasbookmark: function(target) {
        return this.getBookmarksStore().find("target",target)==-1 ? false : true;
    },
});