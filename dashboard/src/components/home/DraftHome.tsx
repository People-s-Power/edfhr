import { CountAllSelector } from "atoms/UserAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const DraftHome = (): JSX.Element => {
  const stats = useRecoilValue(CountAllSelector);

  return (
    <Wrapper className="container">
      <div className="top-section">
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">Lawyers</p> <p className="m-0 text-green fw-bold fs-3">{stats.lawyers}</p>
          </div>
        </div>
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">My Brief</p> <p className="m-0 text-green fw-bold fs-3">{stats.applicants}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DraftHome;

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
`;

// const SingleBrief = ({ applicant }: { applicant: IApplicant }) => {
//   return (
//     <div className="card my-2">
//       <div className="card-inner d-flex justify-content-between">
//         <Link to={`/applications/${applicant?.id}`} className="text-decoration-none link-dark">
//           {applicant?.name}
//         </Link>
//         <div>
//           <Link to={`/applications/${applicant?.id}/draft`} className=" text-decoration-none link-dark">
//             <i className="fas fa-file"></i> Brief
//           </Link>
//           <Link to={`/applications/${applicant?.id}?activeTab=Reports`} className=" text-decoration-none link-dark">
//             <i className="fas fa-envelope ms-3"></i>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
