var event_handler = {
    //register event handlers
    // for keycodes: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    init: function() {
        addEventListener("keydown", this.dummy_func);
    },

    enable_map: function(up, down, left, right) {
        removeEventListener("keydown", this.dummy_func);
        
        this.happen = function(event) {
            event.preventDefault();
            switch (event.keyCode) {
                case 37:
                case 65:
                    Engine.log("left key pressed.")
                    left();
                    break;
                case 38:
                case 87:
                    Engine.log("up key pressed.");
                    up();
                    break;
                case 39:
                case 68:
                    Engine.log("right key pressed.");
                    right();
                    break;
                case 40:
                case 83:
                    Engine.log("down key pressed");
                    down();
                    break;
                default:
                    Engine.log("key code " + event.keyCode + " received and ignored.");
            }
        }

        addEventListener("keydown", this.happen);
    },

    disable_map: function() {
        removeEventListener('keydown', this.happen);
    },

    happen: function() {
        //nothing for now
    },

    dummy_func: function(event) {
        if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
            event.preventDefault();
        }
        Engine.log("key pressed: " + event.keyCode);
    },
};

var EH = event_handler;