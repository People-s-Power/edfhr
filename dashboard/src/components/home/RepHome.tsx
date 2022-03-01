import { CountAllSelector, MyApplicantsAtom } from "atoms/UserAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IApplicant } from "types/Applicant.types";

const RepHome = (): JSX.Element => {
  const stats = useRecoilValue(CountAllSelector);
  const applicants = useRecoilValue<IApplicant[]>(MyApplicantsAtom);

  return (
    <Wrapper className="container-fluid">
      <div className="top-section">
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">Applicants</p> <p className="m-0 text-green fw-bold fs-3">{stats.applicants}</p>
          </div>
        </div>
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">Paid Applicants</p> <p className="m-0 text-green fw-bold fs-3">{applicants?.filter((app) => app.amount_paid > 0)?.length}</p>
          </div>
        </div>
      </div>

      <div className="main mt-3">
        <h6>Recent Updates</h6>
        {/* <div className="main-inner mt-4">
          <div className="left">
            {" "}
            {applicants?.map((applicant, i) => (
              <SingleBrief key={i} applicant={applicant} />
            ))}
          </div>
          <div className="right">
            <h6 className="text-uppercase">Activities</h6>
          </div>
        </div> */}
      </div>
    </Wrapper>
  );
};

export default RepHome;

const Wrapper = styled.div`
  .top-section {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    .item {
      padding: 1rem;
    }
  }
  /* .main {
    &-inner {
      @media screen and (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 30%;
        grid-column-gap: 1rem;
      }
    }
  } */
`;
