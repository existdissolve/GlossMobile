Ext.define('GlossMobile.view.notes.ListView', {
    extend: 'GlossMobile.view.EditableList',
    xtype: 'notes',
    layout: 'fit',
    config: {
        iconCls: 'compose',
        title: 'notes',
        onItemDisclosure: Ext.emptyFn,
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Notes'
            }
        ],
        preventSelectionOnDisclose: true,
        clearSelectionOnDeactivate: true,
        store: 'Notes',
        itemTpl: '{title}',
        loadingText: 'Loading...',
        flex: 1,
        ui: 'charcoal',
        grouped: true
    }
})