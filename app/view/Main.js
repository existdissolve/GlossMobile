Ext.define('GlossMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    id: 'mainpanel',
    requires: ['GlossMobile.view.navigation.DetailCard'],
    config: {
        fullscreen:true,
        items: [
            {
                xtype: 'treeview'
            },
            {
                xtype: 'cflibview'
            },
            {
                xtype: 'bookmarks'
            },
            {
                xtype: 'notes'
            },
            {
                xtype: 'search'
            }
       
        ],
        tabBarPosition: 'bottom',
        tabBar: {
            layout: {pack:'center'}
        }
    }
});