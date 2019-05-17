import io from 'socket.io-client';
import React, {Component} from 'react';
import { connect } from 'react-redux'

class Chat extends Component {
  constructor(props){
    super(props)

    this.state = {
      conversation: [],
      message: '',
      feedback: '',
      username: ''
    }

    this.socket = io.connect('http://localhost:4242');
    
    this.socket.on('room response', data => this.addMessage(data));

  }

  componentDidMount = () => {
    const { trip_id } = this.props
    //join the room for this trip
    this.socket.emit('join room', { room: trip_id })

    //axios.get for the conversations previous message
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
    const { trip_id } = this.props
    this.socket.emit(`chat in room`, {
      message: this.state.message,
      username: this.props.username,
      room: trip_id
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

const mapStateToProps = (reduxState) => {
  const { username } = reduxState.account
  return { username }
}


export default connect(mapStateToProps)(Chat)