// index.js
import TableCanvas from './components/TableCanvas'
import io from 'socket.io-client'
import m from 'mithril'

const Main = {
  oninit: (vnode) => {
    // exampleSocket = new WebSocket("ws://localhost:3000")
    // exampleSocket.onmessage = function (event) {
    //   console.log("geeting " + event.data);
    // }
    // exampleSocket.onopen = function (event) {
    //   exampleSocket.send("join room1");
    //     setInterval(() => {
    //       console.log('sending')
    //       exampleSocket.send("msg hai");
    //     }, 2000)
    // }

    console.log(io)

    var socket = io('http://localhost:8090');
    socket.on('connect', function(){
      console.log('connect')
    });
    socket.on('news', function(data){
      console.log(data)
    });
    socket.on('disconnect', function(){
      console.log('disconnect')
    });
  },
  oncreate: (vnode) => {
  },
  view: () => {
    return (
      <div>
        <TableCanvas />
      </div>
    )
  }
}

m.route(document.body, "/room", {
    "/room": Main, // defines `http://localhost/#!/home`
})
