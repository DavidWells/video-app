# Video Electron App

<img align="right" width="430" height="238" src="https://user-images.githubusercontent.com/532272/45231507-06d5cb80-b281-11e8-8beb-9c2d38ad2672.jpg">

This electron app boots up your webcam and places it in an always on top window.

I use this for video tutorials to place my mug in them.

# Technologies used

- electron
- react
- webpack

# Use cases

- Screencasting
- Personal high tech mirror

## Dev

```sh
# install dependencies
$ npm install

# support for reloading views, restarting electron
# if app/* and/or index.js, electron/* are changed
$ npm start
```

### Build

```sh
$ npm run build      # all
$ npm run build-osx  # osx(64)
$ npm run build-win  # win(32, 64)
```

Video camera icon from [the noun project](https://thenounproject.com/search/?q=camera&i=110607)
