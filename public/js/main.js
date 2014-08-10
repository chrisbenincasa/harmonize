(function() {
    window.Harmonize = window.Harmonize || {};
    Harmonize.socket = io();

    Harmonize.socket.on('connect', function() {
        Harmonize.socket.emit('join room', {
            room: 'rock'
        })
    });

    $(document).ready(function() {
        $('.room-link').click(function(e) {
            e.preventDefault();
            var href = $(this).attr('href');

            var data = $(this).attr('data-room-id');
            Harmonize.socket.emit('join_room', {
                room: data
            });

            window.location = href;
        });
    });
})();
