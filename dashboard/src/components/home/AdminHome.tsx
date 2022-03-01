import { CountAllSelector } from "atoms/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as timeago from "timeago.js";
import { IUser } from "types/Applicant.types";

interface INotice {
  event: string;
  message: string;
  db_model: string;
  createdAt: Date;
  user: IUser;
}

const AdminHome = (): JSX.Element => {
  const stats = useRecoilValue(CountAllSelector);
  const [notices, setNotices] = useState<INotice[]>();

  useEffect(() => {
    // socketClient.on("get-campaigns", (data) => setNotices(data));
    const getAllNotice = async () => {
      try {
        const { data } = await axios.get("/campaign/notice");
        setNotices(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllNotice();
  }, []);

  return (
    <Wrapper className="container-fluid">
      <div className="top-section">
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">Users</p> <p className="m-0 text-green fw-bold fs-3">{stats.users}</p>
          </div>
        </div>
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">Campaigns</p> <p className="m-0 text-green fw-bold fs-3">{stats.campaigns}</p>
          </div>
        </div>
        <div className="card bg-gray item">
          <div className="text-center">
            <p className="text-center m-0 ">Applicants</p> <p className="m-0 text-green fw-bold fs-3">{stats.applicants}</p>
          </div>
        </div>
      </div>

      <div className="main">
        <div>
          <h3 className="text-center my-4 fw-bold text-primary">Recent Updates</h3>

          <div className="notice">
            {notices?.map((notice, i) => (
              <div className="notice-item my-2 bg-gray py-1" key={i}>
                <img src={notice?.user?.image} alt="" />
                <div className="ms-3 fs-small ">
                  <div dangerouslySetInnerHTML={{ __html: notice?.message }} /> <time className="fs-small fst-italic">{timeago.format(notice?.createdAt)}</time>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminHome;

const Wrapper = styled.div`
  .top-section {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    .item {
      padding: 1rem;
    }
  }

  .main {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
    .notice {
      &-item {
        display: flex;
        align-items: center;
        padding: 0.5rem;

        img {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
        }
      }
    }
  }
`;
