var scene_handler = (function() {
    //all of these variables here aren't visible to the outside world

    var create_overlay = function() {
        Engine.log("creating overlay...");

        var overlay = document.createElement('div');

        var id_att = document.createAttribute('id');
        id_att.value = 'overlay';
        overlay.setAttributeNode(id_att);

        return overlay;
    }

    var create_title = function(title) {
        Engine.log("creating scene '" + title + "'...");

        var title_node = document.createElement('p');
        title_node.innerHTML = title;

        return title_node;
    };

    var create_text_node = function(text) {
        Engine.log("writing scene text...");
        var lines = text.split('\n');
        var text_node = document.createElement('p');

        while (lines.length > 0) {
            text_node.innerHTML = text_node.innerHTML + lines.shift() + "<br />";
        }

        return text_node;
    };

    //looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooot!
    //gotta redo this!
    var generate_loot = function(loot) {
        Engine.log("generating loot...");

        var loot_divs = [];
        var loot_names = Object.getOwnPropertyNames(loot);

        while (loot_names.length > 0) {
            if (Math.random() > loot[loot_names[0]].chance) {
                loot_names.shift();
                continue; //the player doesn't deserve the prize this time. sorry.
            }
            loot_divs.push(create_item_button_row(loot_names[0], random_number(loot[loot_names[0]].min, loot[loot_names[0]].max)));
            loot_names.shift();
        }

        return loot_divs;
    };

    var create_buttons = function(buttons) {
        Engine.log("creating scene buttons...");

        var names = Object.getOwnPropertyNames(buttons);
        var b = [];

        while (names.length > 0) {
            if (typeof buttons[names[0]] == 'function') {
                var button_element = document.createElement('button');
                button_element.innerHTML = names[0];
                button_element.addEventListener('mousedown', buttons[names[0]]);

                b.push(button_element); names.shift();
                continue;
            }

            var button_element = document.createElement("button");
            button_element.innerHTML = names[0];

            var current_button_obj = buttons[names[0]];

            if (current_button_obj['next_scene'] == 'end') {
                button_element.addEventListener("mousedown", SH.end_scene);
                b.push(button_element); names.shift();
                continue;
            } else {
                var nexts = Object.getOwnPropertyNames(current_button_obj['next_scene']);
                var thresholds = [];
                var c_t = 0;
                for (var n = 0; n < nexts.length; n++) {
                    thresholds[n] = c_t;
                    c_t += current_button_obj['next_scene'][nexts[n]];
                }

                button_element.addEventListener("mousedown", (function() {
                    var chance = Math.random();

                    for (var i = 0; i < thresholds.length; i = i + 1) {
                        if (chance > thresholds[i] && chance < (thresholds[i + 1] || 1)) {
                            Engine.log("got: " + chance + ", button leads to: '" + nexts[i] + "'...");
                            return function() {
                                SH.next_scene(SH.current_scene_obj['scenes'][nexts[i]]);
                            }
                        }
                    }
                })());

                b.push(button_element); names.shift();
            }
        }

        return b;
    };

    var create_item_button_row = function(name, number) {
        var button_div = document.createElement('div');
        var class_att = document.createAttribute('class');
        class_att.value = 'buttons_row';
        button_div.setAttributeNode(class_att);

        var item_button = document.createElement('button');
        item_button.innerHTML = name + " (" + number + ")";
        button_div.appendChild(item_button);
        item_button.addEventListener("mousedown", function() {
            IPM.add_item(name, 1);

            number = number - 1;
            this.innerHTML = name + " (" + number + ")";

            if (number <= 0) {
                this.nextSibling.disabled = true;
                this.disabled = true;
            }
        });

        var take_all_button = document.createElement('button');
        take_all_button.innerHTML = "take all";
        button_div.appendChild(take_all_button);
        take_all_button.addEventListener('mousedown', function() {
            IPM.add_item(name, number);

            number = 0;

            this.previousSibling.innerHTML = name + " (" + number + ")";
            this.previousSibling.disabled = true;
            this.disabled = true;
        });

        return button_div;
    };

    //gotta make sure that the methods used by the outside world stay the same
    return {
        current_scene: null,
        current_scene_obj: null,

        create_scene: function(scene_obj) {
            if (this.current_scene != null) {
                throw new Error("a scene already exists! end it with SH.end_scene() before starting a new one!");
            } else {
                this.current_scene_obj = scene_obj;
            }

            document.body.appendChild(create_overlay());

            Engine.log('deactivating map handlers...');
            GSM.deactivate_map_handlers();

            //create the scene
            this.current_scene = document.createElement('div');
            var scene_att = document.createAttribute('id');
            scene_att.value = 'scene';
            this.current_scene.setAttributeNode(scene_att);

            document.body.appendChild(this.current_scene);

            this.current_scene.appendChild(create_title(scene_obj['title']));
            this.current_scene.appendChild(document.createElement('hr'));

            Engine.log("loading scene: 'start'...");
            this.create_scene_content(this.current_scene_obj['scenes']['start']);
        },

        end_scene: function() {
            SH.current_scene = null;
            SH.current_scene_obj = null;

            document.body.removeChild(document.getElementById('overlay'));
            document.body.removeChild(document.getElementById('scene'));
            Engine.log("scene ended.");

            Engine.log('reactivating map handlers...');
            GSM.activate_map_handlers();
        },

        create_scene_content: function(scene) {
            this.current_scene.appendChild(create_text_node(scene['text']));
            this.current_scene.appendChild(document.createElement('div'));

            var buttons_panel = this.current_scene.childNodes[3];

            if (scene['onload']) {
                scene['onload']();
            }

            if (scene['mini_map']) {
                this.current_scene.appendChild(MPM.render_mini_map(scene['mini_map']()));
            }

            if (scene['loot']) {
                var loots = generate_loot(scene['loot']);
                while (loots.length > 0) {
                    buttons_panel.appendChild(loots.shift());
                }
            }

            if (scene['buttons']) {
                var buttons = create_buttons(scene['buttons']);
                while (buttons.length > 0) {
                    buttons_panel.appendChild(buttons.shift());
                }
            }
        },

        next_scene: function(scene) {
            //I'm very lazy
            this.current_scene.removeChild(this.current_scene.childNodes[3]);
            this.current_scene.removeChild(this.current_scene.childNodes[2]);

            this.create_scene_content(scene);
        },
    }
})();

var SH = scene_handler;
