document.addEventListener('DOMContentLoaded', () => {
    var socket = io();
    let room='chat';

    socket.on('connect', () => {
        socket.emit('connected', username);
    });


    document.querySelector('#logout').onclick = () => {
        socket.emit('disconnected', {'username': username, 'room':room});
    }

    document.querySelector('#my_details').onclick = () => {
        socket.emit('leave', {'username': username, 'room': room})
    }

    socket.on('message', data => {
        const p = document.createElement('p');
        const b = document.createElement('b');
        if (data.username == username)  {
           b.innerHTML = "You";
        }   else{
            b.innerHTML = data.username;
        }
        p.innerHTML = b.outerHTML + ' | ' + data.msg;
        document.querySelector('#message_display').append(p);
    });

    document.querySelector('#send_button').onclick = () => {
        socket.send({'msg': document.querySelector('#msg_bar').value, 'username': username, 'room': room});
        document.querySelector('#msg_bar').value = '';
    };


    document.querySelector('#join_chat_room').onclick = () => {
        document.querySelector('#join_chat_room').innerHTML = 'Chat Room';
        document.querySelector('#message_display').innerHTML = '';
        joinRoom(room);
    };

    function joinRoom(room){
        socket.emit('join', {'username': username, 'room': room});
    }

    // function joinRoom(room){
    //     console.log(room);
    //     if(!(room == 'chat')){
    //         room = "chat";
    //         socket.emit('join', {'username': username, 'room': room});
    //     } else {
    //         socket.emit('already_join', {'username': username, 'room': room})
    //     }
    // }

    socket.on('add_users', users => {
        document.querySelector('#online_users').innerHTML = "Online Users: ";
        for(var i = 0; i < users.length; i++) {
            const p_users = document.createElement('p');
            p_users.innerHTML = users[i];
            document.querySelector('#online_users').append(p_users);
        }
    })

    socket.on('system', data => {
        const p = document.createElement('p');
        const b = document.createElement('b');
        b.innerHTML = data.user;
        p.innerHTML = b.outerHTML + ' | ' + data.msg;
        document.querySelector('#message_display').append(p);
    });

})