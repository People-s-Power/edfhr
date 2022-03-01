import { useMutation } from "@apollo/client";
import {
  DELETE_RELATIVE,
  UPDATE_RELATIVE,
} from "apollo/queries/applicantQuery";
import MoreIcon from "components/MoreIcon";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const SingleRelComp = ({ relative, onDelete, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    _id: "",
  });
  const [updateRel, { loading: updateLoading }] = useMutation(UPDATE_RELATIVE);
  const [deleteRel] = useMutation(DELETE_RELATIVE);

  useEffect(() => {
    if (relative) {
      setInfo(relative);
    }
  }, [relative]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const payload = {
      name: info.name,
      phone: info.phone,
      _id: info._id,
    };
    try {
      const { data } = await updateRel({ variables: { input: payload } });
      if (data) {
        onUpdate(data.updateRelative);
        setEdit(!edit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id: any) => {
    try {
      const { data } = await deleteRel({ variables: { _id } });
      onDelete(data.deleteRelative._id);
      if (data) {
        alert(`You have successfully deleted ${data.deleteRelative.name}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="theme-card d-flex">
      <div className="flex-1">
        {edit ? (
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            value={info.name}
          />
        ) : (
          <p>{info.name}</p>
        )}
      </div>
      <div className="flex-1">
        {edit ? (
          <input
            type="text"
            className="form-control"
            name="phone"
            value={info.phone}
            onChange={handleChange}
          />
        ) : (
          <p>{info.phone}</p>
        )}
      </div>

      {!edit ? (
        <MoreIcon>
          <li onClick={() => setEdit(!edit)}>Edit</li>
          <li onClick={() => handleDelete(relative._id)}>Remove</li>
        </MoreIcon>
      ) : (
        <>
          <button className="btn " onClick={handleUpdate}>
            {updateLoading ? (
              "Processing..."
            ) : (
              <i className="fas fa-save text-info"></i>
            )}
          </button>
          <button className="btn btn-error" onClick={() => setEdit(!edit)}>
            <i className="fas fa-times text-danger"></i>
          </button>
        </>
      )}
    </div>
  );
};

SingleRelComp.propTypes = {
  relative: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default SingleRelComp;
