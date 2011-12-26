Ext.define('GlossMobile.view.navigation.DetailCard', {
    extend: 'Ext.Panel',
    xtype: 'detailcard',
    config: {
        styleHtmlContent: true,
        scrollable: true,
        layout: 'fit',
        items: [
            {
                xtype: "toolbar",
                docked: "bottom",
                ui: "light",
                items: [
                    {
                        xtype: "button",
                        iconCls: "bookmarks",
                        text: 'Bookmark',
                        iconMask: true,
                        iconAlign: 'right',
                        ui: "confirm",
                        disabled: false
                    },
                    {xtype: 'spacer'},
                    {
                        xtype: "button",
                        iconCls: "compose",
                        text: 'Add Note',
                        iconMask: true,
                        iconAlign: 'right',
                        ui: "confirm"
                    }
                ]
            }
        ]
    }
})