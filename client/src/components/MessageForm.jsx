import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function MessageForm() {
  const user = useSelector((state) => state?.user?.user);
  const [message, setMessage] = useState("");
  const { socket, currentRoom, messages, setMessages } =
    useContext(AppContext);
  const messageEndRef = useRef(null)

  useEffect(() => {
    scrollBottom()
    console.log(messageEndRef)
  }, [messages])


  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month > 10 ? month : `0${month}`;
    let day = date.getDate();
    day = day > 10 ? day : `0${day}`;
    return `${month}/${day}/${year}`;
  };

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  const scrollBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-form", roomId, message, user, time, todayDate);
    setMessage("");
  };

  const todayDate = getFormattedDate();

  return (
    <div>
      <div className="message-output">
        {!user && <div className="alert alert-danger">Please login now</div>}
        {user &&
          messages?.map(({ _id: date, messageByDate }, index) => (
            <div key={index}>
              <p className="alert alert-info text-center messages-date-indicator">
                {date}
              </p>
              {messageByDate?.map(
                ({ content, time, from: sender }, msgIndex) => (
                  <div className={sender?.username === user?.username ? "message" : "message incoming"} key={msgIndex}>
                    <div className="message-inner">
                      <div className="d-flex align-items-center">
                        <img
                          src={sender.picture}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          alt=""
                        />
                        <p className="message-sender">
                          {sender?._id === user?._id ? "You" : sender.username}
                        </p>
                      </div>
                      <p className="message-content">{content}</p>
                      <p className="message-time">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
          <div ref={messageEndRef}></div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Enter your message..."
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              disabled={!user}
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
