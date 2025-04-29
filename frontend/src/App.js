import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import WaitingRoom from './coponents/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './coponents/ChatRoom';


function App() {

  const[conn, setConnection]=useState();
  const[messages, setMessages]=useState([]);

  const joinChatRoom=async (username,chatroom) => {
    try {
      //Initiate a Connection
      const conn=new HubConnectionBuilder()
                    .withUrl("https://localhost:7173/Chat")
                    .configureLogging(LogLevel.Information)
                    .build();
                  
      //Set Up My Handler
      conn.on("JoinSpecificChatRoom",(username,msg)=>{
        setMessages(messages => [...messages, { username, msg }]); // Add join message to state
      });

      conn.on("ReceiveSpecificMessage",(username,msg)=>{
        setMessages(messages=>[...messages,{username,msg}]);
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom",{username,chatroom});

      setConnection(conn);
    } catch (e) {
      console.log(e);
    }
  }


  const sendMessage=async(message)=>{
    try {
      await conn.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
      
    }
  }
 
  return (
    <div >
     <main>
      <Container>
        <Row class='px-5 my-5'>
          <Col sm='12'>
            <h1 className='font-weight-light'>Welcome To My ChatApp</h1>
          </Col>
        </Row>
        { !conn
          ?<WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          :<ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
        } 
      </Container>
     </main>
    </div>
  );
}

export default App;
