var Engine = {
    _log: false,

    log: function(msg) {
        if (this._log) {
            console.log(msg);
        }
    },

    create_scene: function(scene_obj) {
        //create a window, somehow.
        //I'm an idiot, remember?

        //create the overlay, defined in the css
        this.log("creating overlay...");
        var overlay = document.createElement('div');
        var c_att = document.createAttribute('id');
        c_att.value = 'overlay';
        overlay.setAttributeNode(c_att);
        game.appendChild(overlay);

        this.log("creating scene " + scene_obj['title'] + "...");
        var scene = document.createElement('div');

        //set it to 'scene' class
        var class_att = document.createAttribute('id');
        class_att.value = 'scene';
        scene.setAttributeNode(class_att);

        //create the title text node
        var title = document.createElement('p');
        title.innerHTML = scene_obj['title'];
        scene.appendChild(title);

        //create the text part of the scene, describing what is seen
        var scene_text = document.createElement('p');
        var texts = scene_obj['scenes']['start']['text'].split("\n");
        while (texts.length > 0) {
            scene_text.innerHTML += texts.shift() + "<br />";
        }
        scene.appendChild(scene_text);

        //finish

        game.appendChild(scene);
        return scene;
    },

    generate_save_code: function(game) {
        return btoa(JSON.stringify(game));
    },

    notify: function(msg) {
        if (message_panel.childNodes.length > 9 ) {
            message_panel.removeChild(message_panel.childNodes[9]);
        }

        //so much complicated code!
        var new_message = document.createElement("DIV");
        var m_att = document.createAttribute("class");
        m_att.value = "message";
        new_message.setAttributeNode(m_att);

        var message_text = document.createTextNode(msg);
        new_message.appendChild(message_text);

        message_panel.insertBefore(new_message, message_panel.childNodes[0]);
    },

    load_save_code: function(save_code) {
        try {
            return JSON.parse(atob(save_code));
        } catch (err) {
            return null;
        }
    },

    render_tooltip: function(node, text) {
        //finish the tooltip renderer
    },
}
