Harmonize &#9834;
===

```bash
$ git clone git@github.com:chrisbenincasa/harmonize.git
$ npm install
$ bower install
$ node app
```

TODO:
  - [x] Set up basic application and asset pipeline
    - [x] Set up semantics for route loading
    - [x] Set up LESS compilation
  - [ ] Rdio Integration
    - [x] Implement basic OAuth flow for Rdio
    - [x] Get basic oAuth calls working (getPlaybackToken, getCurrentUser)
    - [ ] Create interface for making API calls from the browser (routing layer in between)
    - [ ] Figure out specifics about subscription requirement
  - [ ] Implement front-end as single-page app
    - [ ] Should preserve WebSocket connection throughout
    - [ ] Choose a framework. Angular.js?
    - [ ] Use Bootstrap as a starting point
  - [ ] Set up socket-based data flow
    - [x] Set up basic socket flow
    - [ ] Implement room subscriptions
    - [ ] Entering/exiting rooms (max one room at a time)
    - [ ] Worth using Redis as Adapter?
  - [ ] Implement Rdio Web Playback API
    - [x] Get simple setup and playback working with SWFObject
      - [x] Set up basic functionality: play, pause, next, etc.
    - [ ] Use Websockets for playback synchronization within rooms
  - [ ] Data model/Persistent storage
    - [ ] Save rooms
    - [ ] Save user identities and rooms they favorite
    - [ ] Probably just MySQL...
  - [ ] Use Redis for more persistent user session store
  - [ ] Add tests...lol
