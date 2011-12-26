Ext.define("GlossMobile.controller.Navigation", {
    extend: "Ext.app.Controller",
    models: ["Navigation","CFLib"],
    stores: ["Navigation","CFLib"],
    views: ["navigation.TreeView","navigation.CFLib","navigation.DetailCard"],
    refs: [
        {ref: "treeview", selector: "treeview"},
        {ref: "cflibview", selector: "cflibview"}
    ],
    init: function(){
        this.control({
            "treeview": {
                leafitemtap: function(list,index,el,e,opts) {
                    var record = list.getStore().getAt(index);
                    Ext.getCmp("mainpanel").setActiveItem(this.getTreeview())
                    this.getTreeview().setMask({message:'Loading'})
                    this.getcontent(record)
                },
                load: function(store,records,success,operation,opts) {
                    Ext.Viewport.unmask();
                }
            },
            "cflibview": {
                leafitemtap: function(list,index,el,e,opts) {
                    var record = list.getStore().getAt(index);
                    Ext.getCmp("mainpanel").setActiveItem(this.getCflibview())
                    this.getCflibview().setMask({message:'Loading'})
                    this.getcontent(record)
                }
            },
            "button": {
                tap: function(btn,e) {
                    if(btn.getUi()=='back') {
                        this.getTreeview().getDetailCard().setHtml('')
                    }
                }
            }
        });
    },
    find: function(target,type) {
        var view = type.toLowerCase()=="cfmlref" ? this.getTreeview() : this.getCflibview();
        var node = this.getnode(target,type); 
        if(!node) {
            this.tryredirect(target,type);
            return false;
        }
        view.jumpToNode(node)
    },
    tryredirect: function(target,type) {
        var me = this;
        var view = type.toLowerCase()=="cfmlref" ? this.getTreeview() : this.getCflibview();
        var method  = "loadpage";
        var url     = "../com/navigation.cfc";
        var params  = {method:method,returnformat:"json",target:target,type:type};
        Ext.Ajax.request({
            url:    url,
            params: params,
            success: function(req,opts) {
                var ct = Ext.decode(req.responseText);
                view.redirect = ct.redirect;
                me.find(ct.target,ct.type);
            }
        });
    },
    getnode: function(target,type) {
        var view = type.toLowerCase()=="cfmlref" ? this.getTreeview() : this.getCflibview();
        var tree = view.getStore().tree;
        var nodeid = target.replace(/[-\/.]/g,'');
        var node = tree.getNodeById(nodeid);
        return node;    
    },
    getcontent: function(record) {
        var me = this,
            target = record.get('target'),
            title = record.get('title'),
            type = record.get('type'),
            url,method,params,
            selector = type.toLowerCase()=="cfmlref" ? "cfml_content" : "cflib_content",
            view = type.toLowerCase()=="cfmlref" ? this.getTreeview() : this.getCflibview();
        switch(type.toLowerCase()) {
            case "library":
                method  = "getlibrary";
                url     = "../com/cflib.cfc";
                params  = {method:method,returnformat:"json",target:target,title:title,type:type};
                break;  
            case "udf":
                method  = "getudf";
                url     = "../com/cflib.cfc";
                params  = {method:method,returnformat:"json",target:target,title:title,type:type};
                break;
            case "cfmlref":
                method  = "loadpage";
                url     = "../com/navigation.cfc";
                type    = "CFMLRef";
                params  = {method:method,returnformat:"json",target:target,title:title,type:type};
                break;
        }
        Ext.Ajax.request({
            url:    url,
            params: params,
            success: function(req,opts) {
                var response = Ext.decode(req.responseText);
                var result = response.content;
                var hasbookmark = me.application.getController("Bookmarks").hasbookmark(target);
                var hasnote = me.application.getController("Notes").hasnote(target);
                var detailcard = view.getDetailCard();
                var bookmarkbtn = detailcard.getItems().getAt(0).getItems().getAt(0);
                var bookmarktext = hasbookmark ? "Bookmarked!" : "Bookmark";
                var bookmarkdisable = hasbookmark ? true : false;
                bookmarkbtn.setText(bookmarktext);
                bookmarkbtn.setDisabled(bookmarkdisable);
                bookmarkbtn.setHandler(function() {
                    me.application.getController("Bookmarks").addbookmark(target,title,type);
                    this.disable();
                    this.setText("Bookmarked!");
                });
                var notebtn = detailcard.getItems().getAt(0).getItems().getAt(2);
                var notetext = hasnote ? "Edit Note" : "Add Note";
                var notedisable = hasnote ? true : false;
                notebtn.setText(notetext);
                notebtn.setDisabled(notedisable);
                notebtn.setHandler(function() {
                    me.application.getController("Notes").loadnote(target,title,type);
                });
                            
                detailcard.setHtml(result)
                detailcard.getScrollable().getScroller().scrollTo(0,0)
                view.unmask()
             
                Ext.select("a[class=glosslink]").each(function(){
                    var title   = this.getAttribute("linktitle");
                    var target  = this.getAttribute("linktarget");
                    var type    = this.getAttribute("linktype");
                    Ext.get(this.dom).on("tap",function(){
                        me.find(target,type);
                    });
                })
                Ext.select("a").each(function(){
                    var link = this.getAttribute("href");
                    if(link.substring(0,1)=='#') {
                        Ext.get(this.dom).on("tap",function(e,html) {
                          e.preventDefault()
                          e.stopEvent();
                          if(Ext.get(link.replace('#',''))) {
                              var newpos = Ext.get(link.replace('#','')).getY()-45 
                          }
                          else {
                              var newpos = 0;
                          }
                          detailcard.getScrollable().getScroller().scrollTo(0,newpos)
                        })
                    }
                })
                if (view.redirect) {
                    //window.location.hash = view.redirect;
                    //window.location = window.location + "#" + view.redirect;
                }
            }
        });
    }
});