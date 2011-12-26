Ext.define("GlossMobile.store.CFLib", {
    extend: "Ext.data.TreeStore",
    model:  "GlossMobile.model.CFLib",
    autoLoad: true,
    proxy:  {
        type:   "ajax",
        url: "../nav_handler.cfm?type=cflib&source=mobile"
    },
    root: 'children',
    storeId: "Navigation"
});