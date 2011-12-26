Ext.define("GlossMobile.store.Bookmarks", {
    extend: "Ext.data.Store",
	model:	"GlossMobile.model.Bookmark",
    autoLoad: true,
    autoSync: true,
    storeId: 'Bookmarks',
	proxy: {
        type: 'localstorage',
        id  : 'gloss-mobile-bookmarks'
    },
    sorters: 'title',
    getGroupString: function(record) {
        return record.get('title')[0].toUpperCase();
    }
});