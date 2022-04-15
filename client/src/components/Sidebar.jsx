import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { addNotification, resetNotification } from "../features/userSlide";
import { GoPrimitiveDot } from "react-icons/go";

function Sidebar() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const {
    socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    message,
    setMessage,
    privateMemberMsg,
    setPrivateMemberMsg,
    newMessages,
    setNewMessages,
  } = useContext(AppContext);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });
  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  const joinRoom = (room, isPulic = "true") => {
    if (!user) {
      toast.error("Please login");
    }
    socket.emit("join-room", room);
    setCurrentRoom(room);
    if (isPulic) {
      setPrivateMemberMsg(null);
    }
    dispatch(resetNotification(room));
    socket.off("notification").on("notification", (room) => {
      dispatch(addNotification(room));
    });
  };

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlePrivateMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };
  const getRooms = async () => {
    const res = await axios.get("https://api-chatapp0315.herokuapp.com/room");
    setRooms(res.data);
  };

  if (!user) {
    return <></>;
  }
  return (
    <div>
      <h2>Rooms</h2>
      <ListGroup style={{ textTransform: "capitalize" }}>
        {rooms.map((room, index) => (
          <ListGroup.Item
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            key={index}
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            {room}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user?.newMessage[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member) => (
        <ListGroup.Item
          key={member._id}
          disabled={member._id === user._id}
          active={privateMemberMsg?._id === member?._id}
          onClick={() => handlePrivateMsg(member)}
          style={{ cursor: "pointer" }}
        >
          <Row className="d-flex align-items-center">
            <Col xs={2} className="member-status">
              <img src={member.picture} className="member-status-img" alt="" />
              {member.status === "on" ? (
                <GoPrimitiveDot className="dot" color="green" fontSize={30} />
              ) : (
                <GoPrimitiveDot className="dot" fontSize={30} color="#ccc" />
              )}
            </Col>
            <Col xs={9}>{member.username}</Col>
            <Col className="badge rounded-pill bg-primary" xs={1}>
              {user.newMessage[orderIds(member._id, user._id)]}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
