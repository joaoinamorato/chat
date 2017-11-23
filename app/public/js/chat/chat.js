$(function() {
    $("#content").on('keyup', function (e) {
        if (e.keyCode == 13) {
            $('#sendMsg').click();
        }
    });

    var socket = io('http://localhost');

    $('#sendMsg').click(function () {
        socket.emit(
            'msgToServer', {
                username: $('#username').val(),
                content: $('#content').val()
            }
        );

        $('#content').val('');
    });

    socket.on('msgToClient', function (data) {
        var html = '';
        html += '<div class="dialogo">';
        html += '<h4>' + data.username + '</h4>';
        html += '<p>' + data.msg + '</p>';
        html += '</div>';

        $('#dialogos').append(html);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('usersToClient', function (data) {
        var html = '';
        html += '<span class="participante">';
        html += '<img src="/ico_usuario.png">'
        html += data.apelido;
        html += '</span>';

        $('#users').append(html);
    });
});