Ext.define('GlossMobile.view.search.ListView', {
    extend: 'Ext.dataview.List',
    xtype: 'search',
    layout: 'fit',
    config: {
        iconCls: 'search',
        title: 'Search',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Search',
                ui: 'dark'
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                ui: 'charcoal',
                items: [
                    {
                        xtype: 'searchfield',
                        placeholder: 'Search',
                        name: 'searchfield'
                    }
                ]
            }
        ],
        store: 'Search',
        itemTpl: '{title}',
        flex: 1
    }
})