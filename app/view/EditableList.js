Ext.define("GlossMobile.view.EditableList", {
    extend: "Ext.dataview.List",
    xtype:'editablelist',
    config: {
        inEditMode: false,
        inSwipeMode: false
    },
    initialize: function() {
        var me = this;
        var tmpTpl,tplParams;
        var tmpTpl = new Ext.XTemplate(
            '<div class="x-list-delete">',
                '<div class="x-list-delete-icon multi-delete" id="{id}"></div>',
                '<div class="x-list-delete-content">',
                this.getItemTpl().html,
                '</div>',
                '<div class=" x-component" style="-webkit-box-flex: 1;"></div>',
                '<tpl if="this.isDisclosure()">',
                    '<div class="x-button x-button-decline-small  x-list-delete-button x-hidden deletebutton disclose">',
                        '<span class="x-button-label deletebutton">Delete</span></span>',
                    '</div>',
                '<tpl else>',
                    '<div class="x-button x-button-decline-small  x-list-delete-button x-hidden deletebutton">',
                        '<span class="x-button-label deletebutton">Delete</span></span>',
                    '</div>',
                '</tpl>',
            '</div>',
            {
                isDisclosure: function() {
                    return Ext.isObject(me.getOnItemDisclosure())
                }
            }
        )        
        // apply any existing templates to our new one
        this.setItemTpl(tmpTpl);
        
        // set up listeners for our editable list
        this.on({
            "datachanged": function() {
            },
            // beginEdit: when editing action begins
            "beginEdit": function(list,mode) {
                this.setLocked(true);
                if(mode=="multi") {
                    this.inEditMode = true;
                    this.addDeleteBar();
                }
                else {
                    this.inSwipeMode = true;
                }
            },
            // endEdit; when editing action stops
            "endEdit": function(list,mode) {
                if(mode=="multi") {
                    this.inEditMode = false;
                }
                else {
                    this.inSwipeMode = false;
                }
                this.setLocked(false);
            },
            // itemtap: when an item in our list is tapped; handles regular and in-edit-mode taps
            itemtap: function(view,index,item,e){
                // if we're in view mode, handle delete list fn
                if(view.inEditMode) {
                    var item = Ext.get(item);
                    item.select('div[class*=x-list-delete]').each(function(){
                       if (this.hasCls('selected')) {
                           this.addCls('unselected');
                           this.removeCls('selected');
                           view.setDeleteButton()
                       }
                       else {
                           this.addCls('selected');
                           this.removeCls('unselected');
                           view.setDeleteButton()
                       }
                   })
                }
                // otherwise, let regular process take over
                else {
                    
                    if(e.target.className!="x-list-disclosure" && !e.target.classList.contains('deletebutton')) {
                        //this.select(this.getStore().getAt(index))
                    }
                    if(e.target.classList.contains('deletebutton')) {
                        if(me.inSwipeMode) {
                            me.getStore().removeAt(index);
                            this.hideDeleteIcons();
                        }
                        else {
                            e.stopEvent();
                        }
                    }
                }
            },
            // swipe: when user swipes over a list itme
            itemswipe: function(view,index,item,e) {
                if(view.inEditMode) {
                    return false;
                }
                var swipedIndex = "";
                view.fireEvent("beginEdit",view,"swipe");
                var delbuttons = view.element.query('div[class*=x-list-delete-button]');
                for(var i=0;i<delbuttons.length;i++) {
                    var el = Ext.get(delbuttons[i]);
                    if(el.hasCls("x-display")) {
                       swipedIndex =  i;
                    }
                    el.removeCls("x-display");
                    el.addCls("x-hidden");
                }
                // if the index of the existing delete button equals the row just swiped
                // fire the endEdit event, since swiping is done
                if(swipedIndex===index) {
                    view.fireEvent("endEdit",view,"swipe");
                }
                // otherwise, add the display class to the new row's delete button
                else {
                    var el = Ext.get(item);
                    var delbuttons = el.query('div[class*=x-list-delete-button]');
                    for(var i=0;i<delbuttons.length;i++) {
                        var el = Ext.get(delbuttons[i]);
                        el.removeCls("x-hidden");
                        el.addCls("x-display");
                    }
                }
            }
        })
        this.addEditButton();
        this.callParent()
    },
    /* addEditButton: adds an editing button to the parent panel's toolbar
     * is fired when this component is originally created
     */
    addEditButton: function() {
        var me = this;
        var ttbar = this.getItems().getAt(0);
        var btn = new Ext.Button({
            ui: "action",
            text: "Edit",
            handler: function() {
                if(this.getText() == "Edit") {
                    this.setText("Done");
                    me.showDeleteIcons();
                }
                else {
                    this.setText("Edit");
                    me.hideDeleteIcons();
                }
            },
            listeners: {
                "beginEdit": function(list,mode) {
                    this.setText("Done");  
                },
                "endEdit": function(list,mode) {
                    this.setText("Edit");
                }
            }
        });
        // relay events to the button so we can cherry pick on them from the button as well
        btn.relayEvents(this,['beginEdit','endEdit']);
        ttbar.insert(0,btn);
    },
    /* addDeleteBar: adds a toolbar to the bottom of the parent panel
     * is fired when the mode is set to "multi" (e.g., when not in swipe editing mode)
     */
    addDeleteBar: function() {
        var me = this;
        var bbar = this.getItems().getAt(3);
        if (!bbar) {
            bbar = Ext.create('Ext.Toolbar',{
                docked: "bottom",
                ui: "light",
                id:'test',
                hidden: true,
                showAnimation: "fade",
                listeners: {
                    "endEdit": function(list, mode){
                        this.hide(this.showAnimation)
                    },
                    "hide": function(){
                        this.hide();                   
                    }
                },
                items: [{
                    xtype: "button",
                    iconCls: "trash",
                    iconMask: true,
                    ui: "decline",
                    text: "Delete",
                    disabled: true,
                    handler: me.deleteItems,
                    scope: me
                }]
            });
            // relay event to bottom toolbar so we can cherry pick it from the toolbar as well
            bbar.relayEvents(this, ["endEdit"])
            this.add(bbar);
        }
        bbar.show();
        this.setDeleteButton();
    },
    /* showDeleteIcons: adds/removes classes from list item's delete icons, allowing CSS3 to handle animations
     */
    showDeleteIcons: function() {
        var items = this.element.query("div[class*=x-list-delete]");
        for(var i=0;i<items.length;i++) {
            var item = Ext.get(items[i])
            item.removeCls("hidden");
            item.removeCls("selected");
            item.addCls("unselected");           
        };
        this.fireEvent("beginEdit",this,"multi");
    },
    /* hideDeleteIcons: adds/removes classes from list item's delete icons, allowing CSS3 to handle animations
     */
    hideDeleteIcons: function() {
        var items = this.element.query("div[class*=x-list-delete]");
        var buttons = this.element.query("div[class*=x-list-delete-button]");
        for (var i = 0; i < items.length; i++) {
            var item = Ext.get(items[i])
            item.addCls("hidden"); 
        }
        for (var i = 0; i < buttons.length; i++) {
            var item = Ext.get(buttons[i])
            item.removeCls("x-display");
            item.addCls("x-hidden"); 
        }
        var mode = this.inEditMode ? "multi" : "swipe";
        this.fireEvent("endEdit",this,mode)
    },
    /* onTapStart: override of regular onTapStart() method to prevent highlighting of list items during edit mode
     * is fired every time a list item is taped
     */
    onTapStart: function(e,t) {
        var me = this,
            item = this.findTargetByEvent(e);

        if (item && !this.inEditMode && !this.inSwipeMode) {
            if (me.pressedDelay) {
                if (me.pressedTimeout) {
                    clearTimeout(me.pressedTimeout);
                }
                me.pressedTimeout = setTimeout(function() {
                    Ext.fly(item).addCls(me.pressedCls);
                }, Ext.isNumber(me.pressedDelay) ? me.pressedDelay : 100);
            }
            else {
                Ext.fly(item).addCls(me.pressedCls);
            }
        }
    },
    /* setDeleteButton: enables multi-delete button and increments button "count" text
     */
    setDeleteButton: function() {
        var count = this.element.query("div.x-list-delete-icon.selected").length;
        var tb = this.getItems().getAt(3);
        var btn = tb.getItems().getAt(0)
        if(count) {
            btn.enable()
            btn.setText(Ext.util.Format.format('Delete ({0})', count));
        }
        else {
            btn.setText("Delete");
            btn.disable();
        }
    },
    /* deleteItems: deletes selected items from list's store
     */
    deleteItems: function() {
        var me = this;
        var records = [];
        var groups = me.getStore().getGroups();
        var tmprecords = [];
        var nodes = this.element.select("div.x-list-delete-icon").each(function() {
            if(this.hasCls('selected')) {
                var record = me.getStore().getById(this.id)
                records.push(record)
            }
        });
        this.getStore().remove(records)
        this.getStore().sync()
        this.hideDeleteIcons();
    }
});