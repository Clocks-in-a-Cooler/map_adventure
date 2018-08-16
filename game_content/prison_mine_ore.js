var p_m_ore_scene = {
    'title': 'some ore here',
    'scenes': {
        'start': {
            'text': 'there\'s some ore here.',

            'loot': {
                'ore': {
                    min: 5,
                    max: 15,
                    chance: 1,
                },
            },

            'buttons': {
                'leave': {
                    'tooltip': 'abandon this ore vein',
                    'next_scene': 'end',
                },
            },
        },
    },
};

var p_m_leave_scene = {
    'title': 'out of the prison mine',
    'scenes': {
        'start': {
            'text': 'there\'s some commotion. the guards are rounding up some of you prisoners for some reason.',
            'onload': function() {
                Engine.log('prisoner is escaping!');
            },
            'buttons': {
                'obey the guards': {
                    'tooltip': 'obey the guards, or they\'ll whip you...',
                    'next_scene': {'out of the prison mine': 1},
                },
            },
        },

        'out of the prison mine': {
            'text': 'they crowd all of you onto a cart. through the slats, you watch the outside world rumble past.',
            'onload': function() {
                Engine.log('rendering map...');
                //finish the functionality for this... SH.load_mini_map();
            },
        },
    },
}
