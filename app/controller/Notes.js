Ext.define("GlossMobile.controller.Notes", {
    extend: "Ext.app.Controller",
    models: ["Note"],
    stores: ["Notes"],
    views: ["notes.ListView","notes.FormView"],
    refs: [
        {ref: "notes", selector: "notes"}/*,
        {ref: "noteform", selector: "noteform"}   */
    ],
    init: function(){
        this.control({
            "notes": {
                itemtap: function(list,index,item,e,opts) {
                    var isdisclosure = e.getTarget('div.x-list-disclosure');
                    var record = list.getStore().getAt(index);
                    if(!list.getLocked()) {
                        if (!isdisclosure) {
                            this.application.getController("Navigation").find(record.get('target'), record.get('type'))
                        }
                        else {
                            this.loadnote(record.get('target'), record.get('title'),record.get('type'))
                        }
                        list.deselect(record)
                    }
                }
            }
        });
    },
    hasnote: function(target) {
        return this.getNotesStore().find("target",target)==-1 ? false : true;
    },
    getnote: function(target) {
        return this.getNotesStore().getAt(this.getNotesStore().find("target",target));  
    },
    loadnote: function(target,title,type) {
        var me = this;
        var note = this.getnote(target);
        //var form = new this.getNotesFormViewView();
        if(!note) {
            note = Ext.create("GlossMobile.model.Note",{
                target: target,
                title: title,
                type: type,
                content: ""
            });
        }
        var win = Ext.create('Ext.MessageBox',{
            modal:      true,
            id:         "noteswindow",
            padding:    5,
            bodyPadding:5,
            items: [
                {
                    xtype: "toolbar",
                    docked: "top",
                    title: "Add/Edit Note"
                },
                {
                    xtype:'notesform'
                },
                {
                    xtype: "toolbar",
                    docked: "bottom",
                    items: [
                        {
                            xtype: "button",
                            ui: "action",
                            text: "Cancel",
                            handler: function(){
                                win.hide();
                                win.removeAll(true)
                                win.destroy()
                            }
                        },
                        {xtype: "spacer"},
                        {
                            xtype: "button",
                            ui: "confirm",
                            text: "Save",
                            handler: function(){
                                me.savenote(win.getItems().getAt(1))
                            }
                        }
                    ]
                }
            ]
        });
        win.getItems().getAt(1).loadRecord(note);
        win.show();
    },
    savenote: function(form) {
        form = form.getValues();
        var target = form.target;
        var title = form.title;
        var type = form.type;
        var content = form.content;
        if (this.getNotesStore().find("target", target) == -1) {
            this.addnote(target,title,type,content);
        }
        else {
            this.updatenote(this.getNotesStore().getAt(this.getNotesStore().find("target",target)),content);
        }  
        Ext.getCmp("noteswindow").hide();
        Ext.getCmp("noteswindow").destroy();
    },
    addnote: function(target,title,type,content) {
        var dt = new Date();
        var date = Ext.Date.format(dt,'Y-m-d g:i a');
        var record = Ext.create("GlossMobile.model.Note",{
            target: target,
            title: title,
            type: type,
            content: content,
            created: date
        });
        this.getNotesStore().add(record);
        this.getNotesStore().sort('title','ASC')
    },
    updatenote: function(record,content) {
        var dt = new Date();
        var date = Ext.Date.format(dt,'Y-m-d g:i a');
        record.set("content",content);
        record.set("updated",date);
    },
    preparenote: function(record,node,index,e) {
       var record = record.data;
       this.loadnote(record.target,record.title,record.type);
    },
    selectnote: function(selmodel,records) {
        if(records.length) {
           var record = records[0].data;
           this.application.getController('Navigation').find(record.target,record.type);
        }
    }
});