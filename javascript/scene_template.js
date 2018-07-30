//a template for scenes, not really for use. use as a guide
//based on ADR's way of doing it
//probably the a functional prgrammer's worst nightmare: object-ception!

var scene_template = {
    'title': "scene template title",

    'scenes': {
        'start': {
            'text': "this is the starting scene\nuse \\n to create text with multiple lines.\nsorry",
            'buttons': {
                'end it now': {
                    'tooltip': "ends this demo scene immediately.",
                    'next_scene': 'end',
                },

                'next!': {
                    'tooltip': "proceed to the next scene.",
                    'next_scene': {'scene_one': 1},
                },
            },
        },

        'scene_one': {
            'text': 'this is technically the second scene.\nI\'m an idiot.',
            'buttons': {
                'end it now': {
                    'tooltip': "end this demo, immediately.",
                    'next_scene': 'end',
                },

                'forward!': {
                    'tooltip': "40% chance to scene 2, 60% to scene 3.",
                    'next_scene': {'scene_2': 0.4, 'scene_3': 0.6},
                },
            },
        },

        //...etc... gotta make scenes 2 and 3.
    },
};