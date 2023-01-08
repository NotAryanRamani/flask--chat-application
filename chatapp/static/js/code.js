document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#chat_room').setAttribute('href', 'javascript:void(0)');
    document.querySelector('#chat_room').onclick = function(){
        alert('Please Enter Room Code!!');
    };
    document.querySelector('#my_details').setAttribute('href', 'javascript:void(0)');
    document.querySelector('#my_details').onclick = function(){
        alert('Please Enter Room Code!!');
    };
    document.querySelector('#leave_room').setAttribute('href', 'javascript:void(0)');
    document.querySelector('#leave_room').onclick = function(){
        alert('You are not in a Chat Room!');
    };
}) ;