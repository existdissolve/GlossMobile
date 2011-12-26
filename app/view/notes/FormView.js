Ext.define('GlossMobile.view.notes.FormView', {
    extend: 'Ext.form.FormPanel',
    xtype: 'notesform',
    layout: 'vbox',
    config: {
        height: 280,
        width: 290,
        padding: 0,
        items: [
            {
                xtype: "textareafield",
                id:    "notetextarea",
                height:260,
                name:  "content"
            },
            {
                xtype: "hiddenfield",
                name:  "title"
            },
            {
                xtype: "hiddenfield",
                name: "target"
            },
            {
                xtype: "hiddenfield",
                name: "type"
            }
        ]
    }
});