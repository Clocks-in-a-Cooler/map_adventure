//a template for scenes, not really for use. use as a guide
//based on ADR's way of doing it: https://github.com/doublespeakgames/adarkroom/blob/master/script/events/setpieces.js
//probably the a functional prgrammer's worst nightmare: object-ception!
//it's also my worst nightmare! see scene_handler.js for details!

//remember to use Object.getOwnPropertyNames() to access the button names

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
                    'next_scene': {'scene_1': 1},
                },
            },
        },

        'scene_1': {
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

        'scene_2': {
            'text': 'scene 2. you had a 40% chance of getting this one. \nas a reward, have some cucumber seeds.',
            'loot': {
                'cucumber seeds': {
                    min: 5,
                    max: 19,
                    chance: 1,
                },
                'tomato seeds': {
                    min: 1,
                    max: 5,
                    chance: 0.1,
                },
            },
            'buttons': {
                'end; I am running out of scenes!!': {
                    'tooltip': 'end the demo, because I can\'t make anymore scenes!',
                    'next_scene': 'end',
                },
            },
        },

        'scene_3': {
            'text': 'scene 3! you had a 60% chance of getting this one.',
            'buttons': {
                'end! finally!': {
                    'tooltip': 'end the demo. NOW.',
                    'next_scene': 'end',
                },
            },
        },
    },
};