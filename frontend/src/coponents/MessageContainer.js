import { ListGroup} from "react-bootstrap";


const MessageContainer=({messages})=>{
    console.log("Messages in MessageContainer:", messages);
    return (
        <ListGroup>
          {messages.map((message, index) => (
            <ListGroup.Item key={index}>
              {message.username}: {message.msg}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
}

export default MessageContainer