Ext.define("GlossMobile.view.JumpableNestedList", {
    extend: 'Ext.dataview.NestedList',
    xtype:'jumpablenestedlist',
    config: {
        traceSelectionPath: true,
        hideSelectionPath: true,
        useMasks: true
    },
    initialize: function() {
        var me = this;
        me.callParent(arguments);
    },
    jumpToNode: function(nodeInfo,doSelect,hideActive) {
        var me = this,
            tree = me.getStore().tree,
            nodes = [],
            node = nodeInfo;    
        if(Ext.isString(nodeInfo)) {
            // do lookup of node based on id
            node = tree.getNodeById(nodeInfo);
            if(!nodeInfo) {
                return false;
            }
        }
        // go back to root of tree; this will help with calculations below of "active item"
        me.goToNode(tree.getRootNode());
        // get the depth of the node
        var depth = node.getDepth();
        var nid = node.internalId;
        // loop over depth, get node ids of node hierarchy
        for(i=0;i<depth;i++) {
            nodes.push(nid);
            nid =  tree.nodeHash[nid].parentNode.internalId;
        }
        // reverse the node array, and we'll build out the new lists
        nodes = nodes.reverse();
        var tmpnode;
        // now loop over hierarchy of nodes, adding lists as we go along
        for(i=0;i<nodes.length;i++) {
            tmpnode = tree.getNodeById(nodes[i]);
            if(!tmpnode.isLeaf()) {
                me.goToNode(tmpnode)
            }
            else {
                // get index of record
                var index = tmpnode.parentNode.indexOf(tmpnode)
                // fire event for leaf item tap, so we can plug into same methods as in regular tap events
                this.fireEvent('leafitemtap',me.getActiveItem(),index);
                // go the leaf
                me.goToLeaf(tmpnode)
            }
        }
        
    }
});