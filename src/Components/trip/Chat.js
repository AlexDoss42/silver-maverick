import io from 'socket.io-client';
import React, {Component} from 'react';

class Chat extends Component {
  constructor(){
    super()

    this.state = {
      conversation: [],
      message: '',
      feedback: '',
      username: ''
    }

    this.socket = io.connect('http://localhost:4242');
    
    this.socket.on('chat',data => this.addMessage(data));

  }

  addMessage = (data) => {
    const newConvo = this.state.conversation.slice()
    console.log(newConvo)
    newConvo.push(data)
    this.setState({
      conversation: newConvo
    })
  }

  handleOnClick = () => {
    this.socket.emit('chat', {
      message: this.state.message,
      username: this.state.username
    })

  }

  handleOnChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { conversation } = this.state
    return (
      <div id="adventure-chat">
        <div id="chat-window">
          <div id="output">{ conversation.map((data) => {
            return (<p><em>{data.username}</em>: {data.message}</p>)
          }) }</div>
        </div>
        
        <input 
        id='username' 
        name='username' 
        type="text" 
        placeholder="Username" 
        value={ this.state.username }
        onChange = { this.handleOnChange }/>

        <input 
        id='message' 
        name='message' 
        type="text" 
        placeholder="Message" 
        value={ this.state.message }
        onChange = { this.handleOnChange }/>
        
        <button 
        id='send'
        onClick={ this.handleOnClick }>
        Send</button>

      </div>
    )
  }
}

export default Chat