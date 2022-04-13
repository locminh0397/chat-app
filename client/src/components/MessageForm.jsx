import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";

function MessageForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="message-output">
        
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter your message..." />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "rgb(6, 101, 243)" }}
            >
              <AiOutlineSend color="#fff" />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MessageForm;
