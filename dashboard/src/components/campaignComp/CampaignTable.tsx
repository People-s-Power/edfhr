import { gql, useQuery } from "@apollo/client";
import axios from "axios";
import React, { useState } from "react";
import { Loader, Toggle } from "rsuite";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";

const GET_CAMPAIGNS = gql`
  {
    getCampaigns {
      title
      id
      target
      status
      author {
        firstName
        lastName
      }
    }
  }
`;

const CampaignTableComp = ({ campPerPage, current_Page }: { campPerPage: number; current_Page: number }): JSX.Element => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const currentPage = current_Page;

  const { loading } = useQuery(GET_CAMPAIGNS, {
    onCompleted: (data) => setCampaigns(data.getCampaigns),
    onError: (err) => console.log(err),
  });
  if (loading) return <Loader content="Loading..." />;

  const indexOfLastCamp = currentPage * campPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campPerPage;
  const currentCamp = campaigns?.slice(indexOfFirstCamp, indexOfLastCamp);

  return (
    <Wrapper>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Name</th>
            <th scope="col">Target</th>
            <th scope="col">Approve</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentCamp?.map((camp: ICampaign, i) => (
            <Tr
              key={i}
              camp={camp}
              onDelete={(e) => {
                setCampaigns(campaigns.filter((camp) => camp.id !== e));
              }}
            />
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default CampaignTableComp;

const Wrapper = styled.div`
  height: 600px;
  overflow-y: scroll;

  table {
    th {
      font-weight: normal;
    }
  }
`;

const Tr = ({ camp, onDelete }: { camp: ICampaign; onDelete(d: string): void }): JSX.Element => {
  const [campaign, setCampaign] = useState<ICampaign>(camp);
  const handleApproveCampaign = async () => {
    try {
      const { data } = await axios.post("/campaign/approve", { campaign_id: camp.id });
      setCampaign(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Do you want to delete campaign ?");
    if (!confirmed) return;

    try {
      const { data } = await axios.delete(`/campaign/single/${camp.id}`);
      onDelete(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>
        <div className="text-truncate" style={{ maxWidth: "200px" }}>
          {campaign?.title}
        </div>
      </td>
      <td>
        {campaign?.author?.firstName} {camp?.author?.lastName}
      </td>
      <td>
        <div className="text-truncate" style={{ maxWidth: "200px" }}>
          {campaign?.target}
        </div>
      </td>
      <td>
        <div className="d-flex gap-3 align-items-center">
          <Toggle
            defaultChecked={campaign?.status !== "Pending"}
            onChange={handleApproveCampaign}
            size="md"
            checkedChildren={
              <span>
                <i className="fas fa-check-circle text-light-green"></i> {campaign?.status}
              </span>
            }
            unCheckedChildren={
              <span>
                Pending <i className="fas fa-times-circle text-warning"></i>
              </span>
            }
          />
        </div>
      </td>
      <td>
        <button className="btn btn-small text-danger p-0" onClick={handleDelete}>
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  );
};
