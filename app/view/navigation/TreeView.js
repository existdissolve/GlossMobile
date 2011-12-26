Ext.define('GlossMobile.view.navigation.TreeView', {
    extend: "GlossMobile.view.JumpableNestedList",
    alias:'widget.treeview',
    config: {
        iconCls: "cf-logo",
        title: "CF9 Reference",
        store: 'Navigation',
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
})