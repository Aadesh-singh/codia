class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:5000",{transports:["websocket","polling","flashsocket"]}),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets..."),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codia"}),e.socket.on("user_joined",(function(e){console.log("A user Joined: ",e)}))})),$("#send-button").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codia"})})),e.socket.on("receive_message",(function(s){console.log("Message received",s.message);let o=$("<div>"),t="received";s.user_email==e.userEmail&&(t="sent"),o.append($("<span>",{html:s.message})),o.append($("<sub>",{html:s.user_email})),o.addClass(t),$("#user-chat-box").append(o)}))}}