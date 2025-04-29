import { useState } from "react";
import { Col, Form, FormGroup, Row } from "react-bootstrap";

const WaitingRoom=({joinChatRoom})=>{

    const[username,setUserName]=useState();
    const[chatroom,setChatRoom]=useState();

    return<Form onSubmit={e=>{
        e.preventDefault();
        joinChatRoom(username,chatroom);
    }}>
        <Row className="px-5 py-5">
            <Col sm={12}>
                <FormGroup>
                    <Form.Control placeholder='Username' 
                                onChange={e=>setUserName(e.target.value)}/>
                   
                    <Form.Control placeholder='ChatRoom' 
                               onChange={e=>setChatRoom(e.target.value)}/>
                </FormGroup>
            </Col>
            <Col sm={12}>
                <hr/>
                <button variant='success' type='submit'>Join</button>
            </Col>
        </Row>
    </Form>

}
export default WaitingRoom;