import React from "react";
import { Avatar } from "rsuite";

const SideNotification = () => {
  return (
    <div className="note-card d-flex p-2 align-items-center">
      <Avatar className="mr-2" size="md" />

      <div className="d-flex flex-column">
        <h6 className="mb-0">Kelvin Spacey</h6>
        <small>16 May 2020</small>
      </div>
    </div>
  );
};

export default SideNotification;
