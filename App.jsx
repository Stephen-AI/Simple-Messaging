import React from 'react';
import io from 'socket.io-client'
var socket = io('http://localhost:7070')

class App extends React.Component {
    constructor(){
        super()
        this.state = {stuff: ['somebody', 'once', 'told', 'me', 'the']}
    }
    componentDidMount(){
        socket.on('connect', () => {
            console.log(`Connection established at ${socket.id}`)
        })
        socket.on('message', msg => {
            this.setState({stuff: [...this.state.stuff, msg]})
            this.forceUpdate()
        })
    }
   render() {
      return (
         <div>
            <ul>
                {this.state.stuff.map(x =>
                <li> {x} </li>)}
            </ul>
         </div>
      );
   }
}
export default App
