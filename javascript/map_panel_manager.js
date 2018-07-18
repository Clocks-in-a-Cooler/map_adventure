var map_panel_manager = {
    //for managing map_panel, only handles one map at a time
    current_map: null,

    init: function() {
        this.map = new Map();
    },

    display_map: function(map) {
        var rows = map.stringify.split('\n');

        var rowsleft = 0;
        
        while (rowsleft <= rows.length) {
            map_panel.appendChild(document.createTextNode(rows[rowsleft]));
            
            map_panel.appendChild(document.createElement("br"));
            
            rowsleft = rowsleft + 1;
        }
    }
}

//alias
var MPM = map_panel_manager;
