Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext', 'lib/src')
Ext.application({
    name: 'GlossMobile',
    controllers: ['Navigation','Bookmarks','Notes','Search'],
    views: ['Main'],
    requires: ['Ext.DateExtras'],
    launch: function() {
        Ext.override(Ext.data.Batch,{
            constructor: function(config) {
                var me = this;
                if(config.hasOwnProperty) {
                    this.proxy = config.proxy;
                }
                me.mixins.observable.constructor.call(me,config);
                me.operations = [];
            }
        })
        Ext.override(Ext.dataview.List,{
            findGroupHeaderIndices: function() {
                if (!this.getGrouped()) {
                    return;
                }
                var me = this,
                    store = me.getStore(),
                    groups = store.getGroups(),
                    groupLn = groups.length,
                    items = me.getViewItems(),
                    newHeaderItems = [],
                    footerClsShortCache = me.footerClsShortCache,
                    i, firstGroupedRecord, index, item;
        
                me.doRemoveHeaders();
                me.doRemoveFooterCls();
        
                if (items.length) {
                    for (i = 0; i < groupLn; i++) {
                        firstGroupedRecord = groups[i].children[0];
                        index = store.indexOf(firstGroupedRecord);
                        item = items[index];
                        me.doAddHeader(item, store.getGroupString(firstGroupedRecord));
                        
                        if (i) {
                            Ext.fly(item.previousSibling).addCls(footerClsShortCache);
                        }
                        newHeaderItems.push(index);
                    }
                    if(items.length>=2) {
                        Ext.fly(items[items.length - 2]).addCls(footerClsShortCache);
                    }
                }
                return newHeaderItems;
            }
        })
        Ext.Viewport.setMask({message:'Loading'})
        Ext.Viewport.add({
            xclass: 'GlossMobile.view.Main'
        })
    }
})