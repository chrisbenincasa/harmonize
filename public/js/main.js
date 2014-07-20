var socket = io('/namespace');

socket.on('connect', function() {
    socket.emit('join room', {
        room: 'rock'
    })
});

$(document).ready(function() {
    $('.room-link').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');

        var data = $(this).attr('data-room-id');
        socket.emit('join room', {
            room: data
        });

        window.location = href;
    });
});