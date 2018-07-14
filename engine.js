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

    load_save_code: function(save_code) {
        try {
            return JSON.parse(atob(save_code));
        } catch (err) {
            return null;
        }
    }
}
