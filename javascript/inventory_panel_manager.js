var inventory_panel_manager = {
    init: function() {

    },

    items: {
        //blank for now
    },

    add_item: function(name, number) {
        if (this.items[name]) {
            this.items[name] += number;
            var item = document.getElementById('item_' + name);

            if (this.items[name] == 0) {
                //remove from the inventory display
                inventory_panel.removeChild(item);
            }

            var index = item.innerHTML.search(/\d/);

            item.innerHTML = item.innerHTML.slice(0, index) + this.items[name];
        } else {
            var inventory_item = (function() {
                var i = document.createElement('div');
                var c = document.createAttribute('class');
                c.value = 'inventory_item';
                var id = document.createAttribute('id');
                id.value = 'item_'  + name;

                i.setAttributeNode(c);
                i.setAttributeNode(id);

                return i;
            })();

            inventory_item.innerHTML = name + ": " + number;

            inventory_panel.appendChild(inventory_item);

            this.items[name] = number;
        }
    },

    remove_all: function(name) {
        if (this.items[name]) {
            inventory_panel.removeChild(document.getElementById('item_' + name));
            delete this.items[name];
        } else {
            return;
        }
    },

    clear_inventory: function() {
        this.items = {};
        inventory_panel.innerHTML = "";
    },

    get_number: function(name) {
        if (this.items[name] == undefined) {
            return 0;
        }

        return this.items[name];
    }
};

//alias
var IPM = inventory_panel_manager;
