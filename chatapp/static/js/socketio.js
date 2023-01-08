document.addEventListener('DOMContentLoaded', () => {
    var socket = io();
    let room = user_room;
    joinRoom(room);

    socket.on('connect', () => {
        socket.emit('connected', username);
    });


    document.querySelector('#logout').onclick = () => {
        socket.emit('disconnected', {'username': username, 'room':room});
    }

    document.querySelector('#my_details').onclick = () => {
        leaveRoom(room);
    }

    document.querySelector('#leave_room').onclick = () => {
        leaveRoom(room);
    }

    socket.on('message', data => {
        const p = document.createElement('p');
        const b = document.createElement('b');
        if (data.username == username)  {
           b.innerHTML = "You";
           p.innerHTML = data.msg + ' | ' + b.outerHTML;
           p.style.textAlign = 'right';
        }   else{
            b.innerHTML = data.username;
            p.innerHTML = b.outerHTML + ' | ' + data.msg;
        }
        document.querySelector('#message_display').append(p);
        var display = document.querySelector('#message_display');
        display.scrollTop = display.scrollHeight;
    });

    document.querySelector('#send_button').onclick = () => {
        var text = document.querySelector('#msg_bar').value;
        if(text != ''){
        socket.send({'msg': text, 'username': username, 'room': room});
        document.querySelector('#msg_bar').value = '';
        }
    };

    function joinRoom(room){
        document.querySelector('#message_display').innerHTML = '';
        socket.emit('join', {'username': username, 'room': room});
    }

    socket.on('add_users', function(users) {
        document.querySelector('#online_users').innerHTML = "Online Users: ";
        for(var i = 0; i < users.length; i++) {
            const p_users = document.createElement('p');
            p_users.innerHTML = users[i];
            document.querySelector('#online_users').append(p_users);
        }
    });

    socket.on('system', data => {
        const p = document.createElement('p');
        const b = document.createElement('b');
        b.innerHTML = data.user;
        p.innerHTML = b.outerHTML + ' | ' + data.msg;
        document.querySelector('#message_display').append(p);
    });

    function leaveRoom(room){
        socket.emit('leave', {'username': username, 'room': room});
    };

    addEventListener('beforeunload', () => {
        socket.emit('disconnected', {'username': username, 'room':room});
    });

})