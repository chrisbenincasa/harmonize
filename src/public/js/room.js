(function() {
    window.Harmonize = window.Harmonize || {};
    var playbackToken, apiswf, playKey;

    Harmonize.setPlaybackToken = function(token) {
        playbackToken = token;
    };

    Harmonize.ready = function(user) {
        apiswf = $('#apiswf').get(0);
        $('#play').click(function() {
            var newVal = $('#play_key').val();
            if (playKey === newVal) {
                apiswf.rdio_play();
            } else {
                playKey = newVal;
                apiswf.rdio_play(playKey);
            }
        });

        $('#stop').click(function() {
            apiswf.rdio_stop();
        });

        $('#pause').click(function() {
            apiswf.rdio_pause();
        });
        $('#previous').click(function() { apiswf.rdio_previous(); });
        $('#next').click(function() { apiswf.rdio_next(); });
    };

    Harmonize.freeRemainingChanged = function(remaining) {
        console.log('remaining time changed to ' + remaining);
        $('#remainingTime').text(remaining);
    };

    Harmonize.playStateChanged = function(playState) {
        $('#playState').text(playState);
    };

    Harmonize.playingTrackChanged = function(playingTrack, sourcePosition) {
        if (playingTrack) {
            $('#track').text(playingTrack['name']);
            $('#album').text(playingTrack['album']);
            $('#artist').text(playingTrack['artist']);
            $('#art').attr('src', playingTrack['icon']);
        }
    };

    Harmonize.positionChanged = function(position) {
        // TODO communicate with websocket that position changed
        console.log('emitting... ' + Harmonize.socket);
        Harmonize.socket.emit('time_updated', {
            position: position
        });
    };

    $(document).ready(function() {
        var flashVars = {
            playbackToken: playbackToken,
            domain: window.location.hostname,
            listener: 'Harmonize'
            // enableLogging: 1
        };

        var params = {
            allowScriptAccess: 'always'
        };

        var attributes = {};

        swfobject.embedSWF(
            'http://www.rdio.com/api/swf/',
            'apiswf', 1, 1,
            '9.0.0',
            'expressInstall.swf',
            flashVars,
            params,
            attributes);
    });
})();
