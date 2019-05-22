import io from 'socket.io-client';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Message from '../tiles/Message';

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conversation: [],
      message: '',
      feedback: '',
      username: '',
      user_id: this.props.user_id
    }

    this.socket = io.connect('http://localhost:4242');

    this.socket.on('room response', data => this.addMessage(data));

  }

  componentDidMount = () => {

    const { trip_id } = this.props

    //join the room for this trip

    this.socket.emit('join room', { trip_id })

    //axios.get for the conversations previous message

    axios.get(`/chat/tripConversation/${trip_id}`)
      .then(res => {
        this.setState({
          conversation: res.data
        })
      })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.conversation !== this.state.conversation)

  // }

  addMessage = (data) => {
    const newConvo = this.state.conversation.slice()
    newConvo.push(data)
    this.setState({
      conversation: newConvo
    })
  }

  handleOnClick = () => {

    const { trip_id } = this.props

    if (this.state.message === '') {
      alert('You need to type a message')
    } else {


      this.socket.emit(`chat in room`, {
        message: this.state.message,
        username: this.props.username,
        trip_id,
      })
      axios.post('/chat/message', {
        message: this.state.message,
        username: this.props.username,
        user_id: this.props.user_id,
        trip_id,
      })
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDelete = async (deleteId) => {
    const { trip_id } = this.props

    await axios.delete(`/chat/delete/${deleteId}`)
    axios.get(`/chat/tripConversation/${trip_id}`)
      .then(res => {
        this.setState({
          conversation: res.data
        })
      })
  }

  render() {
    const { conversation } = this.state

    const Messages = conversation.map((message) => (
      <Message
        message={message}
        key={message.chat_id}
        deleteId={message.chat_id}
        handleDelete={this.handleDelete}
      />
    ))
    return (
      <div id="adventure-chat">
        <div id="chat-window">
          <div id="output">
            {Messages}
          </div>
        </div>

        <input
          id='message'
          name='message'
          type="text"
          placeholder="Message"
          value={this.state.message}
          onChange={this.handleOnChange} />

        <button
          id='send'
          onClick={this.handleOnClick}>
          Send</button>

      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { username, user_id } = reduxState.account
  return { username, user_id }
}


export default connect(mapStateToProps)(Chat)