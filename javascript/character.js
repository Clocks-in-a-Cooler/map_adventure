function Character(name) {
    this.name = name;
    this.lines = [];

    for (var i = 1; i < arguments.length; i = i + 1) {
        this.lines.push(arguments[i]);
    }
}

Character.prototype.add_lines = function() {
    for (var i = 0; i < arguments.length; i = i + 1) {
        this.lines.push(arguments[i]);
    }
};

Character.prototype.get_name = function() {
    return this.name;
}

Character.prototype.get_line = function(i) {
    return lines;
}