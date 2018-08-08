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
