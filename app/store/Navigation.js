Ext.define("GlossMobile.store.Navigation", {
    extend: "Ext.data.TreeStore",
    model:  "GlossMobile.model.Navigation",
    autoLoad: true,
    proxy:  {
        type:   "ajax",
        url: "../nav_handler.cfm?type=regular&source=mobile"
    },
    root: 'children',
    storeId: "Navigation"
});