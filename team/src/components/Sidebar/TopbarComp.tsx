import { UserAtom } from "atom/UserAtom";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { useRecoilValue } from "recoil";
import { Avatar } from "rsuite";
import styled from "styled-components";

interface TopbarProps {
  step1?: string;
  step2?: string;
}

const TopbarComp: React.FC<TopbarProps> = ({ step1, step2 }) => {
  const user = useRecoilValue(UserAtom);
  return (
    <Wrapper>
      <div className="d-flex align-items-center justify-content-between">
        <ul className="breadcrumb bg-light p-0">
          <li className="breadcrumb-item">
            <Link href="/home">Home</Link>
          </li>
          {step1 && step1 !== "Home" && (
            <li className="breadcrumb-item">{step1}</li>
          )}
          {step2 && <li className="breadcrumb-item">{step2}</li>}
        </ul>
        <div className="top-bar_right d-flex align-items-end">
          <div className="name-position ">
            <h6 className="mr-1 my-0 ">{user?.name}</h6>
            <small className="mt-0 font-italic">{user?.position}</small>
          </div>
          {/* <Badge>
            <Icon icon="bell-o" size="lg" />
          </Badge> */}
          <Avatar circle src={user?.image} className="ml-3" />
        </div>
      </div>
    </Wrapper>
  );
};

TopbarComp.propTypes = {
  step1: PropTypes.string,
  step2: PropTypes.string,
};

export default TopbarComp;

const Wrapper = styled.div`
  .name-position {
    h6 {
      line-height: 0.25;
    }
  }
`;
