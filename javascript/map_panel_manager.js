var map_panel_manager = {

    display_map: function(map) {
        //clear the map
        map_panel.innerHTML = "";

        var rows = map.stringify().split('\n');

        var rowsleft = 0;

        while (rowsleft < rows.length) {
            var line = document.createElement("P");
            var tiles = rows[rowsleft].split("");
            var tile;

            while (tiles.length > 0) {
                tile = tiles.shift(); //remove a tile

                //style landmarks
                if (tile == MAP_TILES.BLANK) {
                    line.innerHTML += "&#160;"
                } else if ((function(x, y, tile) {
                    if (tile == MAP_TILES.PLAYER) {
                        return true;
                    } else if (map.get_special_tile(x, y)) {
                        return true;
                    } else {
                        return false;
                    }
                })(rows[0].length - tiles.length - 1, rowsleft, tile)) {
                    line.innerHTML += "<span style='color:black; font-weight: bold;'>" + tile + "</span>";
                } else {
                    line.innerHTML += tile;
                }
            }

            var p_att = document.createAttribute("style");
            p_att.value = "margin: 0px; display: block;";
            line.setAttributeNode(p_att);

            map_panel.appendChild(line);
            rowsleft = rowsleft + 1;
        }
    },
}

//alias
var MPM = map_panel_manager;
