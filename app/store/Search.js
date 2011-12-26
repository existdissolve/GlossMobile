Ext.define("GlossMobile.store.Search", {
    extend: "Ext.data.Store",
	model:	"GlossMobile.model.Search",
    storeId: 'Search',
	proxy: {
		type:	"ajax",
        url: "../com/search.cfc",
        extraParams: {method:"searchcontent",query:'',returnformat:"json"},
        reader: {
			type: "json",
			root: "search"
		}
   }
});