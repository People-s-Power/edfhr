import React, { Children } from "react";
import { Modal, ModalProps } from "rsuite";
import PropTypes from "prop-types";
import styled from "styled-components";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";

enum Sizes {
  "xs",
  "sm",
  "md",
  "lg",
}

// interface ModalProps {
//   show: boolean;
//   onClose(): any;
//   title?: string;
//   children: React.ReactChild;
//   size?: Sizes | any;
// }

const ModalComp: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  children,
  size,

  ...props
}): JSX.Element => {
  return (
    <Wrapper
      show={show}
      onHide={onClose}
      size={size}
      {...props}
      style={{ overflow: "visible" }}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Wrapper>
  );
};

const Wrapper = styled(Modal)``;

ModalComp.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  footer: PropTypes.any,
  size: PropTypes.any,
};

ModalComp.defaultProps = {
  size: "md",
};

export default ModalComp;

const ModalFooterComp = ({ children }) => {
  return <Modal.Footer>{children}</Modal.Footer>;
};
