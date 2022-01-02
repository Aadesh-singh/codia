class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codia'
            });

            self.socket.on('user_joined', function(data){
                console.log('A user Joined: ',data);
            })
        });

        $('#send-button').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codia'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('Message received', data.message);

            let newMessage = $('<div>');
            let messageType = 'received';

            if(data.user_email == self.userEmail){
                messageType = 'sent'
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#user-chat-box').append(newMessage);

        });
    }
}