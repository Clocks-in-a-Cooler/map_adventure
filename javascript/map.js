function Map(string, width, height) {

    string = string.split("\n").join(""); //removes line breaks
    
    if (string.length == width * height) {
        this.map_array = string.split("");
        this.width = width;
        this.height = height;
    } else {
        throw new Error("map size doesn't match the string length");
    }

    this.special_tiles = []; //for special tiles

    this.player_x = null;
    this.player_y = null;

    for (var i = 0; i < width * height; i = i + 1) {
        this.special_tiles[i] = null; //start out with no special tiles, for now.
    }
}

//returns a printable string of the map, complete with \n characters
Map.prototype.stringify = function() {
    var stringified_map = "";

    for (var a = 0; a < this.height; a = a + 1) {

        for (var b = 0; b < this.width; b = b + 1) {
            if (b == this.player_x && a == this.player_y) {
                stringified_map = stringified_map + MAP_TILES.PLAYER;
            } else {
                stringified_map = stringified_map + this.get_tile(b, a);
            }
        }

        stringified_map = stringified_map + "\n";
    }

    return stringified_map;
};

//gets the distance between two points; doesn't matter which point is first
Map.prototype.get_euclidean_distance = function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)); //pythagoras is my friend, yo!
};

//gets the distance between two points, taxicab style
Map.prototype.get_taxicab_distance = function(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

//returns a map that is a portion of the original one
Map.prototype.get_sub_map = function(x1, y1, x2, y2) {
    var sub_map_array = [];

    //start at the top left corner, and make my way across and down
    for (var i = y1; i <= y2; i = i + 1) {
        for (var j = x1; j <= x2; j = j + 1) {
            sub_map_array.push(this.get_tile(j, i));
        }
    }

    var sub_map_width = x2 - x1 + 1;
    var sub_map_height = y2 - y1 + 1;

    return new Map((sub_map_array.join("")), sub_map_width, sub_map_height);
}

//give it a pair of co-ordinates, and it'll give you where to find that tile in the array
Map.prototype.get_tile_pos = function(width, height) {
    return width + height * this.width;
};

//returns a tile from the map
Map.prototype.get_tile = function(width, height) {
    var tile_pos = this.get_tile_pos(width, height);
    return this.map_array[tile_pos];
};

//sets a tile in the map. permanently.
Map.prototype.set_tile = function(width, height, new_tile) {
    var tile_pos = this.get_tile_pos(width, height);
    this.map_array[tile_pos] = new_tile;
};

Map.prototype.set_special_tile = function(width, height, new_special_tile) {
    var special_tile_pos = this.get_tile_pos(width, height);
    this.special_tiles[special_tile_pos] = new_special_tile;
};

Map.prototype.get_special_tile = function(width, height) {
    var special_tile_pos = this.get_tile_pos(width, height);
    return this.special_tiles[special_tile_pos];
};

Map.prototype.remove_special_tile = function(width, height) {
    var special_tile_pos = this.get_tile_pos(width, height);
    this.special_tiles[special_tile_pos] = null; //set it to null
};

Map.prototype.place_player = function(x, y) {
    this.player_x = x;
    this.player_y = y;
}

Map.prototype.move_up = function() {
    this.player_y = this.player_y - 1;
}

Map.prototype.move_down = function() {
    this.player_y = this.player_y + 1;
}

Map.prototype.move_left = function() {
    this.player_x = this.player_x - 1;
}

Map.prototype.move_right = function() {
    this.player_x = this.player_x + 1;
}


//the special tile object, as a template for special tiles
function Special_tile(name, action) {
    this.name = name;
    
    if (action == undefined) {
        this.action = this.no_action;
    }
}

Special_tile.prototype.no_action = function() {
    //do nothing
};