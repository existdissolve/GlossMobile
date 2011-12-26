Ext.define('GlossMobile.view.navigation.CFLib', {
    extend: "GlossMobile.view.JumpableNestedList",
    alias:'widget.cflibview',
    config: {
        iconCls: "bookmarks",
        title: "CFLib",
        store: 'CFLib',
        displayField: "text",
        redirect: false,
        useTitleAsBackText: false,
        loadingText: "Loading...",
        toolbar: {
            ui: 'dark'
        },
        flex: 1,
        detailCard: {
            xtype: "detailcard"
        }
    }
});