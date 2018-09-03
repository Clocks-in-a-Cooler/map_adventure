# Map adventure
by clocks-in-a-cooler

> something has happened...

Map Adventure is a *crude* Javascript game. You can enjoy it [here](https://clocks-in-a-cooler.github.io/map_adventure).

## Getting started

You can get started by... [playing the game](https://clocks-in-a-cooler.github.io/map_adventure)!

You can also poke around and mess with it.

### Poking around

First, open up the [game](https://clocks-in-a-cooler.github.io/map_adventure).

Then, open up the Javascript console and try some of these:

- __turn on logging__ &mdash; `Engine._log = true;`

    This turns on logging, showing what is being done when a key is pressed, when a scene is loaded, or when the player moves.

    __Note:__ Logging to the Javascript console slows down the page and even the browser. If logging is slowing the browser down too much, you can turn it off by typing `Engine._log = false;`.

- __add an item to the inventory__ &mdash; `IPM.add_item("silicon", 3);`

    This adds three silicons to the inventory. You can enter also enter `IPM.add_item("silicon", -2);` to add -2 silicons to the inventory. (in other words, remove 2 silicons from the inventory).

- __start a scene__ &mdash; `SH.create_scene(scene_template);`

    This line loads a scene. Click the buttons to interact with it. To see what the scene handler is doing, type `Engine._log = true;` to turn on logging.

- __write a message__ &mdash; `Engine.notify("message from the javascript console!");`

    This line writes a message to the left side of the page.

## Using code from this project (aka _licensing_)

> This is free and unencumbered software released into the public domain.
>
> Anyone is free to copy, modify, publish, use, compile, sell, or
> distribute this software, either in source code form or as a compiled
> binary, for any purpose, commercial or non-commercial, and by any
> means.

This means that Map adventure's code is in the public domain. So you can use any part of it in any way you want. There is no copyright, no conditions, and no warranty. Feel free to do whatever you want.
