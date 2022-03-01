import { useMutation } from "@apollo/client";
import { DELETE_EXHIBIT } from "apollo/queries/applicantQuery";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

interface ExhibitI {
  exhibit: any;
  onDelete(a: any): void;
}

const SingleExhibitComp: React.FC<ExhibitI> = ({ exhibit, onDelete }) => {
  const { image, name, _id } = exhibit;

  const [deleteExhibit, { loading }] = useMutation(DELETE_EXHIBIT);

  const handleDelete = async (_id) => {
    if (!_id) return;

    try {
      const { data } = await deleteExhibit({ variables: { _id } });

      if (data) {
        alert(`You have removed ${data.deleteExhibit.name} successfully`);
        onDelete(data.deleteExhibit._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="card_wrapper">
        <div className="card">
          <div className="card-image">
            <img src={image} alt="" />
          </div>
          <div className="card-header d-flex justify-content-between align-center">
            <div className="card-title h6">{name}</div>

            <button className="btn" onClick={() => handleDelete(_id)}>
              <i className="fas fa-trash text-danger"></i>
            </button>
          </div>
          {loading && (
            <div className="overlay">
              <p>Processing....</p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card_wrapper {
    .card {
      position: relative;
    }
    img {
      width: 100%;
      /* height: 100%; */
      height: 300px;
    }
    .overlay {
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;

      justify-content: center;
      align-items: center;
      p {
        color: white;
      }
      display: flex;
    }
  }
`;
SingleExhibitComp.propTypes = {
  exhibit: PropTypes.object,
  onDelete: PropTypes.func,
};

export default SingleExhibitComp;
