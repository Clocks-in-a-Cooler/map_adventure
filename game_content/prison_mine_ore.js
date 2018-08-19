var p_m_ore_scene = {
    'title': 'some ore here',
    'scenes': {
        'start': {
            'text': 'there\'s some ore here.',
            'onload': function() {
                GSM.current_map.remove_special_tile(GSM.current_map.player_x, GSM.current_map.player_y);
                Engine.log("removed special tile at (" + GSM.current_map.player_x + ", " + GSM.current_map.player_y + ")");
            },

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
                GSM.add_map(generate_forest_map(70, 70), 'forest map');

                GSM.set_current_map('forest_map');
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

                var iterations = random_number(10, 35);

                setTimeOut(function() {
                    //finish, making the minimap move
                }, 1500)
            },

            'mini_map': GSM.current_map.get_sub_map(65, 21, 69, 26),
        },
    },
}
