import React from "react";
import { ListGroup } from "react-bootstrap";

function Sidebar() {
  const rooms = ["first", "second", "third"];
  return (
    <div>
      <h2>Rooms</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Sidebar;
