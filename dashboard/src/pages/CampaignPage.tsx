import { CountAllSelector } from "atoms/UserAtom";
import CampaignTableComp from "components/campaignComp/CampaignTable";
import Pagination from "components/campaignComp/pagination/Pagination";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const CampaignPage = (): JSX.Element => {
  const [campPerPage, setCampPerPage] = useState(10);
  const [currentpaginate, setCurrentPaginate] = useState(1);
  const { campaigns: totalCamp } = useRecoilValue(CountAllSelector);
  const paginate = (pageNum: any) => setCurrentPaginate(pageNum);
  return (
    <Wrapper className="container-fluid">
      <div className="main">
        <div className="left my-2">
          <form className="mb-3 align-items-center row">
            <div className="col input-group search-sec">
              <span className="input-group-text rounded-0 border-end-0">
                <i className="fas fa-search"></i>
              </span>
              <input type="search" className="form-control shadow-none form-control-lg border-start-0" placeholder="Search Campaigns" />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary  bg-green fs-5 d-flex gap-3 align-items-center py-2 rounded">
                <i className="fas fa-filter"></i>
              </button>
            </div>
          </form>
          <h2 className="text-primary mb-3">AllCampaigns</h2>
          <CampaignTableComp campPerPage={campPerPage} current_Page={currentpaginate} />
          <div className="bg-sky d-flex justify-content-between align-content-center   ">
            <Pagination campPerPage={campPerPage} totalCamp={totalCamp} paginate={paginate} />
            <div className="d-flex px-4  align-items-center">
              <span className="me-3">Rows per page</span>
              <select className="px-2 py-1 " onChange={(e) => setCampPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CampaignPage;

const Wrapper = styled.div`
  .main {
    .left {
      form {
        .search-sec {
          span {
            background: #ebffeb;
          }
          input {
            background: #ebffeb;
          }
        }
      }
      table {
        thead {
          tr {
            background: #ebffeb;
            border-radius: 20px 20px 0px 0px !important;
          }
        }
        tbody {
          overflow: auto;
        }
      }
      .under-table {
        &_right {
          select {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
`;
