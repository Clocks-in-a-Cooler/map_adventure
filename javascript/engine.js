var Engine = {
    _log: false,

    log: function(msg) {
        if (this._log) {
            console.log(msg);
        }
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
