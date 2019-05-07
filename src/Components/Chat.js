import io from 'socket.io-client';
import React, {Component} from 'react';

class Chat extends Component {
  constructor(){
    super()
    const socket = io.connect('http://localhost:4242');

    socket.on('chat', function(data){
      // feedback.innerHTML = ''
      // output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
    });
    
    socket.on('typing', function(data){
      // feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });

  }

  render() {
    return (

      <div id="mario-chat">
        <div id="chat-window">
          <div id="output"></div>
          <div id="feedback"></div>
        </div>
        <input id='handle' type="text" placeholder="Handle" />
        <input id='message' type="text" placeholder="Message" />
        <button id='send'>Send</button>
      </div>
    )
  }
}


export default Chat