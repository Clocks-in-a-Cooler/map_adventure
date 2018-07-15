var game_state_manager = {
    //manages the state of the game;
    //not yet included in index.html.

    maps: [],  //holds the maps

    init: function() {

    },

    end_game: function(ending) {
        if (ending == "death") {
            Engine.notify("you slump onto the ground. the world fades.");
        }
    }
}