import { useQuery } from "@apollo/client";
import { GET_LAWYERS } from "apollo/queries/userQuery";
import { UserAtom } from "atoms/UserAtom";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import styled from "styled-components";
import { IUser, StaffRoleEnum } from "types/Applicant.types";

const LegalWorldPage = (): JSX.Element => {
  const [lawyers, setLawyers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const { loading } = useQuery(GET_LAWYERS, {
    variables: { role: StaffRoleEnum.Lawyer },
    onCompleted: (data) => setLawyers(data.getUsers),
    onError: (err) => console.log(err),
  });

  if (loading) return <Loader content="Loading..." />;
  return (
    <Wrapper className="container">
      <div className="search-form mt-3">
        <input type="search" className="form-control" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <h5 className="text-center mt-3 text-uppercase text-primary">Legal World</h5>
      <div className="main mt-3">
        <div className="inner">
          {lawyers
            .filter((lawyer) => lawyer?.firstName.toLowerCase().includes(search.toLowerCase()) || lawyer?.lastName.toLowerCase().includes(search.toLowerCase()))
            ?.map((lawyer, i) => (
              <Single key={i} lawyer={lawyer} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
    overflow: scroll;
  }
  .main {
    .inner {
      display: grid;
      gap: 1rem;
      @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media screen and (min-width: 920px) and (max-width: 1199px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (min-width: 768px) and (max-width: 919px) {
        grid-template-columns: repeat(2, 1fr);
      }
      .single-lawyer {
        background-color: #f5f6fa;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        img {
          width: 100%;
          max-height: 30rem;
          object-fit: cover;
          object-position: top;
          flex: 1;
          @media (min-width: 768px) {
            max-height: 15rem;
          }
        }
      }
    }
  }
`;

export default LegalWorldPage;

const Single = ({ lawyer }: { lawyer: IUser }) => {
  const user = useRecoilValue(UserAtom);
  const router = useHistory();

  const handleRoutes = () => {
    if (!user?.role) return;
    if (user?.role === StaffRoleEnum.Admin) router.push(`/users/${lawyer?.id}`);
    else return;
  };
  return (
    <div className="single-lawyer c-hand" onClick={handleRoutes}>
      <img src={lawyer?.image || "/images/placeholder.png"} alt="" />
      <div className="p-2">
        <p className="mb-1">
          {lawyer?.firstName} {lawyer?.lastName}
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <small className="text-muted">
            <i className="fas fa-map-marker"></i> Nigeria, {lawyer?.state}
          </small>
          <div>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.38684 0.352381H4.49018L4.47867 0.322323C4.40385 0.128226 4.21711 0 4.00894 0H1.70248C1.26536 0 0.897949 0.346945 0.897949 0.784063V9.21562C0.897949 9.6521 1.26504 10 1.70248 10H7.70158C7.79591 10 7.88385 9.95331 7.93693 9.87625C7.99001 9.79887 8.00184 9.70006 7.9689 9.61276H8.38716C8.79166 9.61276 9.10215 9.28629 9.10215 8.8821V1.0856C9.10183 0.681418 8.79102 0.352381 8.38684 0.352381ZM8.29251 8.76795H7.65617L7.29964 7.8256C7.49437 7.79011 7.64115 7.62447 7.64115 7.4195C7.64115 7.18831 7.4544 7.00732 7.22257 7.00732H6.98946L6.69784 6.23285H7.29356C7.52475 6.23285 7.71149 6.04099 7.71149 5.81012C7.71149 5.57925 7.52475 5.38803 7.29356 5.38803H6.38543L6.0938 4.61324H7.29356C7.52475 4.61324 7.71149 4.43897 7.71149 4.20842C7.71149 3.97723 7.52475 3.80296 7.29356 3.80296H5.78139L5.48977 3.02881H7.29356C7.52475 3.02881 7.71149 2.83695 7.71149 2.60608C7.71149 2.37553 7.52475 2.18399 7.29356 2.18399H5.17768L4.80227 1.19784H8.29219V8.76795H8.29251Z"
                fill="#00401C"
              />
            </svg>{" "}
            <small className="fs-small"> {lawyer?.applicantCount}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
