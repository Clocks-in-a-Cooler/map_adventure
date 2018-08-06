var scene_handler = {
    current_scene: null,
    current_scene_obj: null,

    create_scene: function (scene_obj) {
        //check if a scene already exists
        if (document.getElementById('scene') || document.getElementById('overlay')) {
            throw new Error("a scene already exists!\nend it with SH.end_scene() before starting a new one!");
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

        //finish the buttons part, very clunky
        var buttons_panel = document.createElement('div');
        var buttons = SH.create_buttons(scene_obj['scenes']['start']['buttons']);

        while (buttons.length > 0) {
            buttons_panel.appendChild(buttons.shift());
        }

        /*  IGNORE THE CODE BELOW. IT'S BUGGY!!!!!
        for (var b = 0; b < buttons.length; b++) {
            (function () {
                var button = scene_obj['scenes']['start']['buttons'][buttons[b]];
                var b_element = document.createElement('button');
                var onclick_att = document.createAttribute('onclick');

                //build the function for the onclick
                var onclick_f;
                if (button['next_scene'] == 'end') {
                    onclick_att.value = 'SH.end_scene();'
                } else {
                    //build a function, yes, from scratch
                    var func = "";
                    var next_scenes = Object.getOwnPropertyNames(button['next_scene']);
                    var threshold = 0;
                    while (next_scenes.length > 0) {
                        var chanse = button[next_scenes[0]];
                        func = "if (chance >= " + threshold + ") SH.next_scene(SH.current_scene_obj['scenes']['" + next_scenes.pop() + "']); " + func;
                        threshold += chanse;
                    }

                    func = "var chance = Math.random(); " + func;

                    onclick_att.value = func;
                }

                b_element.innerHTML = buttons[b];
                b_element.setAttributeNode(onclick_att);
                buttons_panel.appendChild(b_element);
            })();
        } */

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

        //reset the buttons
        this.current_scene.childNodes[3].innerHTML = "";
        
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
    }
};

var SH = scene_handler;