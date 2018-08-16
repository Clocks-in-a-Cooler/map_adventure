//map generator
function generate_blank_map(width, height, tile) {
    var num_of_tiles = width * height;
    var s = "";

    while (num_of_tiles > 0) {
        s = s + tile;

        num_of_tiles--;
    }

    return new Map(s, width, height);
}

function generate_prison_mine_map(width, height) {
    if (isNaN(width) || isNaN(height)) {
        throw new Error("either width or height is not a number. check your code for anything producing NaN.");
    }

    var m = generate_blank_map(width, height, MAP_TILES.ROCK);

    //time to manipulate the map!

    //ore generation
    var upper_limit = Math.floor(width * height * 0.1);
    var lower_limit = Math.floor(width * height * 0.01);
    var num_of_ores = random_number(lower_limit, upper_limit);

    var ore_x;
    var ore_y;

    while (num_of_ores > 0) {
        ore_x = random_number(0, width);
        ore_y = random_number(0, height);

        if (m.get_tile(ore_x, ore_y) == MAP_TILES.ORE) {
            continue; //there's already ore there. Ore is there?
        }

        m.set_tile(ore_x, ore_y, MAP_TILES.ORE);
        var ore_special_tile = new Special_tile("ore", function() {
            SH.create_scene(p_m_ore_scene);
        });
        m.set_special_tile(ore_x, ore_y, ore_special_tile);

        num_of_ores--;
    }

    //the mine entrance, will be at 69, 35 on a 70 * 70 map.
    var mine_entrance_x = width - 1;
    var mine_entrance_y = Math.floor(height / 2);

    m.set_tile(mine_entrance_x, mine_entrance_y, MAP_TILES.MINE_ENTRANCE);
    m.place_player(mine_entrance_x, mine_entrance_y);

    return m;
}
