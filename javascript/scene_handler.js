var scene_handler = {
    current_scene: null,
    current_scene_obj: null,

    create_scene: function(scene_obj) {
        //check if a scene already exists
        if (this.current_scene) {
            throw new Error("a scene already exists! end it with SH.end_scene() before starting a new one!");
        }

        //create the overlay, defined in the css
        Engine.log("creating overlay...");
        var overlay = document.createElement('div');
        var i_att = document.createAttribute('id');
        i_att.value = 'overlay';
        overlay.setAttributeNode(i_att);
        game.appendChild(overlay);

        Engine.log("creating scene " + scene_obj['title'] + "...");
        var scene = document.createElement('div');

        //set it to 'scene' class
        var i_att = document.createAttribute('id');
        i_att.value = 'scene';
        scene.setAttributeNode(i_att);

        //create the title text node
        var title = document.createElement('p');
        var c_att = document.createAttribute('class');
        c_att.value = 'box_label';
        title.setAttributeNode(c_att);
        title.innerHTML = scene_obj['title'];
        scene.appendChild(title);

        //create a horizontal line
        scene.appendChild(document.createElement('hr'));

        //create the text part of the scene, describing what is seen
        var scene_text = document.createElement('p');
        var texts = scene_obj['scenes']['start']['text'].split("\n");
        while (texts.length > 0) {
            scene_text.innerHTML += texts.shift() + "<br />";
        }
        scene.appendChild(scene_text);

        //finished the buttons part, very clunky
        var buttons_panel = document.createElement('div');

        //loooooooooooooooooooooooooooooooooooooooot!
        if (scene_obj['scenes']['start']['loot']) {
            var loot_buttons = this.generate_loot(scene_obj['scenes']['start']['loot']);

            while (loot_buttons.length > 0) {
                buttons_panel.appendChild(loot_buttons.shift());
            }
        }
        var buttons = SH.create_buttons(scene_obj['scenes']['start']['buttons']);

        while (buttons.length > 0) {
            buttons_panel.appendChild(buttons.shift());
        }

        scene.appendChild(buttons_panel);

        game.appendChild(scene);
        this.current_scene = scene;
        this.current_scene_obj = scene_obj;
        return scene;
    },

    end_scene: function() {
        game.removeChild(document.getElementById('overlay'));
        game.removeChild(document.getElementById('scene'));
        this.current_scene = null;
        this.current_scene_obj = null;
    },

    next_scene: function(next) {
        //reset the texts
        this.current_scene.childNodes[2].innerHTML = "";
        var texts = next['text'].split("\n");
        while (texts.length > 0) {
            this.current_scene.childNodes[2].innerHTML += texts.shift() + "<br />";
        }
        //this.current_scene.childNodes[2] = this.create_text(next['text']);

        //reset the buttons
        this.current_scene.childNodes[3].innerHTML = "";

        if (next['loot']) {
            var loot_buttons = this.generate_loot(next['loot']);

            while (loot_buttons.length > 0) {
                this.current_scene.childNodes[2].appendChild(loot_buttons.shift());
            }
        }
        
        var buttons = SH.create_buttons(next['buttons']);

        while (buttons.length > 0) {
            this.current_scene.childNodes[3].appendChild(buttons.shift());
        }
    },

    create_buttons: function(buttons) {
        //for the lack of better variable names
        var b = [];
        var c = Object.getOwnPropertyNames(buttons);

        while (c.length > 0) {
            var a = document.createElement('button');
            a.innerHTML = c[0];
            var onclick_att = document.createAttribute('onclick');

            var d = buttons[c.shift()];

            //build the functions
            if (d['next_scene'] == 'end') {
                onclick_att.value = "SH.end_scene();";
            } else {
                var func = "";
                var threshold = 0;
                var e = d['next_scene'];
                var f = Object.getOwnPropertyNames(e);

                while (f.length > 0) {
                    var weight = e[f[0]];
                    func = "if (chance >= " + threshold + ") SH.next_scene(SH.current_scene_obj['scenes']['" + f.shift() + "']); " + func;

                    if (f.length > 0) {
                        func = "else " + func;
                    }

                    threshold += weight;
                }

                func = "var chance = Math.random(); " + func;
                onclick_att.value = func;
            }

            a.setAttributeNode(onclick_att);
            b.push(a);
        }

        return b;
    },

    generate_loot: function(loot) {
        var loot_buttons = [];
        var loot_names = Object.getOwnPropertyNames(loot);

        while (loot_names.length > 0) {
            if (Math.random() > loot[loot_names[0]].chance) {
                loot_names.shift();
                continue; //the player doesn't deserve the prize this time. sorry.
            }

            var name = loot_names[0];
            var number = random_number(loot[loot_names[0]].min, loot[loot_names[0]].max);

            var loot_button = document.createElement('button');
            loot_button.innerHTML = name;
            loot_button.addEventListener("mousedown", (function() {
                var num = number;
                var item_name = name;
                
                return function(event) {
                    IPM.add_item(item_name, 1);
                    num -= 1;

                    if (num == 0) {
                        this.disabled = true;
                    }
                };
            })());

            loot_names.shift();

            loot_buttons.push(loot_button);
        }

        return loot_buttons;
    },

    create_text: function(text) {
        var t = text.split("\n");
        var tn = document.createElement('P');

        while (t.length > 0) {
            tn.innerHTML = tn.innerHTML + t.shift() + "<br />";
        }

        return tn;
    },
};

var SH = scene_handler;

// UNDER CONSTRUCTION. DANGER due to THE IIFES
var scene_handler2 = (function() {
    //all of these variables here aren't visible to the outside world
    var current_scene;
    var current_scene_obj;

    var create_overlay = function() {
        var overlay = document.createElement('div');

        var id_att = document.createAttribute('id');
        id_att.value = 'overlay';
        overlay.setAttributeNode(id_att);

        return overlay;
    }

    var create_title = function(title) {
        var title_node = document.createElement('p');
        title_node.innerHTML = title;

        return title_node;
    };

    var create_text_node = function(text) {
        var lines = text.split('\n');
        var text_node = document.createElement('p');

        while (lines.length > 0) {
            text_node.innerHTML = text_node.innerHTML + lines.shift() + "<br />";
        }

        return text_node;
    };

    //looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooot!
    var generate_loot = function(loot) {

    };

    var create_buttons = function(buttons) {

    };

    //gotta make sure that the methods used by the outside world stay the same
    return {
        create_scene: function(scene_obj) {
            if (current_scene) {
                throw new Error("a scene already exists! end it with SH.end_scene() before starting a new one!");
            }

            //finish
        },
    }
})();