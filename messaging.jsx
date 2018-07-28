import React from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client'

// import "./styles.css";

var socket = io('http://localhost:7070')

const ChatBox = props => (
      <li className = {`chatbox chatbox person${props.id}`} > {`${props.text}`} </li>
)

class Chat extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      chats : [],
      message: ''
    }
    this.sendText = this.sendText.bind(this)
    this.change = this.change.bind(this)
  }

  componentDidMount(){
    socket.on('connect', () => {
        console.log(`Connection established at ${socket.id}`)
    })
    socket.on('message', msg => {
      this.setState({
        chats: [...this.state.chats, {
          text: msg,
          textid: 2
        }],
        message: ''
      })
        this.forceUpdate()
    })
  }

  sendText(event){
    if(this.state.message)
    {
      socket.send(this.state.message)
      this.setState({
        chats: [...this.state.chats, {
          text: this.state.message,
          textid: 1
        }],
        message: ''
      })
      document.querySelector('.text').value = ''
      this.forceUpdate()
    }
    event.preventDefault();
  }

  change(event){
    this.setState({message: event.target.value})
  }

  render(){
    return(
     [ <ul>
        {
          this.state.chats.map(chat =>
            <ChatBox text={chat.text} id={chat.textid}/>
          )
        }
      </ul>,
        <form class='text-input' onSubmit={this.sendText} id='1'>
          <textarea  class="text" rows="4" cols="50" onChange={this.change}></textarea>
          <input class='button' type="submit" value="Send"/>
        </form>
     ]
    )
  }
}

const rootElement = document.getElementById("root");
export default Chat
