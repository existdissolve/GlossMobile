Ext.define("GlossMobile.store.Notes", {
    extend: "Ext.data.Store",
    model: "GlossMobile.model.Note",
	autoLoad: true,
    autoSync: true,
    storeId: "Notes",
	proxy: {
		type: "localstorage",
		id: "gloss-mobile-notes"
	},
    sorters: 'title',
    getGroupString: function(record) {
        return record.get('title')[0].toUpperCase();
    }    
});