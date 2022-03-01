import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { allStates } from "utils/states";
import useQueryParam from "utils/useQueryParam";

const ProfilePage = (): JSX.Element => {
  const router = useHistory();
  const query = useQueryParam().get("tab") || "Profile";
  return (
    <div>
      <nav className="navbar nav-dark bg-info">
        <ul className="nav">
          <li className="nav-item me-3">
            <a href="#" onClick={() => router.push("/profile?tab=Profile")} className={`nav-link link-dark text-decoration-none ${query === "Profile" ? "border-bottom border-1 border-primary" : ""}`}>
              Profile
            </a>
          </li>
          <li className="nav-item  ">
            <a href="#" onClick={() => router.push("/profile?tab=Password")} className={`nav-link link-dark text-decoration-none ${query === "Password" ? "border-bottom border-1 border-primary" : ""}`}>
              Password & Security
            </a>
          </li>
        </ul>
      </nav>

      <div className="container mt-3">{query === "Profile" ? <ProfileDetails /> : <ChangePassword />}</div>
    </div>
  );
};

export default ProfilePage;

const ChangePassword = () => {
  return (
    <div className="profile-details mt-3 w-75 mx-auto">
      <h6 className="bg-sky py-3 text-center mb-0 fw-bold">Change Password</h6>
      <div className="container bg-gray p-3">
        <form className="form">
          <div className="form-group row align-items-center">
            <div className="col-md-4">
              <label>Current Password</label>
            </div>
            <div className="col-md-8">
              <input type="password" className="form-control" />
            </div>
          </div>
          <div className="form-group row align-items-center">
            <div className="col-md-4">
              <label>New Password</label>
            </div>
            <div className="col-md-8">
              <input type="password" className="form-control" />
            </div>
          </div>
          <div className="form-group row align-items-center">
            <div className="col-md-4">
              <label>Confirm New Password</label>
            </div>
            <div className="col-md-8">
              <input type="password" className="form-control" />
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-warning px-5 text-light me-2">Cancel</button>
            <button className="btn btn-primary px-5 text-light">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileDetails = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [edit, setEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const reader = new FileReader();
    if (files && files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as any);
        }
      };
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, firstName, lastName, state, phone } = user;
    try {
      await axios.put("/user", { id, firstName, lastName, state, phone });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/user/upload", { image: imagePreview });
      setUser({ ...user, image: data });
      setImagePreview("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
      setLoading(false);
    }
  };
  return (
    <ProfileWrapper className="profile-setting w-75 mx-auto">
      <div className="image mx-auto">
        <img src={user?.image || imagePreview || "images/placeholder.png"} width="200" height="200" className="image-fit" alt="" />
        <input type="file" className="d-none" ref={imageRef} onChange={handleFileUpload} />
        <div className="d-grid mt-1">
          {imagePreview ? (
            <button className="btn btn-primary text-light" onClick={uploadImage}>
              {loading ? "Uploading..." : "Save Image"}
            </button>
          ) : (
            <button className="btn btn-warning text-light" onClick={() => imageRef.current?.click()}>
              Change Image
            </button>
          )}
        </div>
      </div>

      <div className="profile-details mt-3">
        <div className="bg-sky py-3 container d-flex justify-content-between ">
          <h6 className="mb-0 fw-bold">Details</h6>
          <i className={`fas fa-pen c-hand ${edit ? "text-success" : "text-blue"}`} onClick={() => setEdit(!edit)}></i>
        </div>
        <div className="container bg-gray p-3">
          <form className="form" onSubmit={handleUpdate}>
            <div className="form-group row align-items-center">
              <div className="col-md-4">
                <label>First Name</label>
              </div>
              <div className="col-md-8">{edit ? <input type="text" className="form-control" name="firstName" value={user?.firstName} onChange={handleChange} /> : <p className="m-0">{user?.firstName}</p>}</div>
            </div>
            <div className="form-group row align-items-center">
              <div className="col-md-4">
                <label>Last Name</label>
              </div>
              <div className="col-md-8">{edit ? <input type="text" className="form-control" name="lastName" value={user?.lastName} onChange={handleChange} /> : <p className="m-0">{user?.lastName}</p>}</div>
            </div>
            <div className="form-group row align-items-center">
              <div className="col-md-4">
                <label>Phone</label>
              </div>
              <div className="col-md-8">{edit ? <input type="text" className="form-control" name="phone" value={user?.phone} onChange={handleChange} /> : <p className="m-0">{user?.phone}</p>}</div>
            </div>
            <div className="form-group row align-items-center">
              <div className="col-md-4">
                <label>Email</label>
              </div>
              <div className="col-md-8">{edit ? <input type="text" className="form-control" name="email" value={user?.email} onChange={handleChange} disabled /> : <p className="m-0">{user?.email}</p>}</div>
            </div>
            <div className="form-group row align-items-center">
              <div className="col-md-4">
                <label>State</label>
              </div>
              <div className="col-md-8">
                {edit ? (
                  <select id="" className="form-select" name="state" value={user?.state} onChange={handleChange}>
                    {allStates.map(({ state }, i) => (
                      <option key={i}>{state.name}</option>
                    ))}
                  </select>
                ) : (
                  <p>{user?.state}</p>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-warning px-5 text-light" disabled={!edit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  .image {
    width: 100%;
    max-width: 20rem;
    margin: auto;
  }
`;
