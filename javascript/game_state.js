var game_state_manager = {
    //manages the state of the game;
    //not yet included in index.html.

    maps: {},  //holds the maps
    current_map: null,
    LIGHT_RADIUS: 2,

    init: function() {

    },

    add_map: function(new_map, name) {
        this.maps[name] = new_maps;
    },

    end_game: function(ending) {
        if (ending == "death") {
            Engine.notify("you slump onto the ground. the world fades.");
        }
    },

    set_current_map: function(name) {
        this.current_map = this.maps[name];
    },

    start_game: function() {
        this.maps['prison mine map'] = generate_prison_mine_map(70, 70);
        MPM.display_map(this.maps['prison mine map']);
        this.set_current_map('prison mine map');

        EH.enable_map(function() {
            GSM.current_map.move_up();
            MPM.display_map(GSM.current_map);
        }, function() {
            GSM.current_map.move_down();
            MPM.display_map(GSM.current_map);
        }, function() {
            GSM.current_map.move_left();
            MPM.display_map(GSM.current_map);
        }, function() {
            GSM.current_map.move_right();
            MPM.display_map(GSM.current_map);
        });

        Engine.log("starting game...");
        Engine.notify('prison mine.');
    },

    deactivate_map_handlers: function() {
        EH.disable_map();
    },

    activate_map_handlers: function() {
        EH.enable_map(function() {
            GSM.current_map.move_up();
            MPM.display_map(GSM.current_map);
        }, function() {
            GSM.current_map.move_down();
            MPM.display_map(GSM.current_map);
        }, function() {
            GSM.current_map.move_left();
            MPM.display_map(GSM.current_map);
        }, function() {
            GSM.current_map.move_right();
            MPM.display_map(GSM.current_map);
        });
    },
};

var GSM = game_state_manager;
