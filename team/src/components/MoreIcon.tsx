import PropTypes from "prop-types";
import React, { ReactNodeArray, useRef } from "react";
import { Icon } from "rsuite";
import { useAwayListener } from "./AwayListner";

interface MoreIconProps {
  children: ReactNodeArray;
}

const MoreIcon: React.FC<MoreIconProps> = ({ children }) => {
  const ref = useRef(null);
  useAwayListener(ref, () => {
    console.log("action emitted");
  });
  return (
    <div className="more-icon">
      <div className="dropdown dropleft">
        <button
          className="btn"
          type="button"
          // id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Icon icon="ellipsis-v" />
        </button>
        <div className="dropdown-menu">{children}</div>
      </div>
    </div>
  );
};

export default MoreIcon;

MoreIcon.propTypes = {
  children: PropTypes.array,
};
