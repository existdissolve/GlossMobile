Ext.define('GlossMobile.view.bookmarks.ListView', {
    extend: 'GlossMobile.view.EditableList',
    xtype: 'bookmarks',
    layout: 'fit',
    config: {
        iconCls: 'bookmark2',
        title: 'Bookmarks',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Bookmarks'
            }
        ],
        preventSelectionOnDisclose: true,
        clearSelectionOnDeactivate: true,
        store: 'Bookmarks',
        itemTpl: '{title}',
        loadingText: 'Loading...',
        flex: 1,
        indexBar: true,
        grouped: true
    }
})