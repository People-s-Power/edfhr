import { useMutation } from "@apollo/client";
import {
  CHANGE_PASSWORD,
  UPDATE_USER,
  UPLOAD_USER_IMAGE,
} from "apollo/queries/userQuery";
import { UserAtom } from "atom/UserAtom";
import Layout from "components/Layout";
import { CustomError } from "components/users/RegisterComp";
import router from "next/router";
import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { allStates } from "utils/states";
import withAuth from "utils/withAuth";

const settingsPage: React.FC = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [preview, setPreview] = useState("");
  const [view, setView] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(null);
  const [uploadImage, { loading: uploading }] = useMutation(UPLOAD_USER_IMAGE);

  const handleImagePreview = () => {
    const file = fileRef.current.files[0];
    const imageLink = URL.createObjectURL(file);
    setPreview(imageLink);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImageUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // return console.log(image);
    try {
      const { data } = await uploadImage({
        variables: { image, _id: user._id },
      });
      alert("Success");
      setUser({
        ...user,
        image: data.uploadImage.image,
      });
      setPreview(null);
    } catch (error) {
      CustomError(error);
    }
  };

  if (!user) return <Loader />;
  return (
    <Layout title="Settings">
      <div className="settings">
        <h5 className="heading">Update Profile</h5>

        <div className="mt-3 settings-wrapper ">
          <div className="card settings-side p-2  ">
            <div className="image-view my-3">
              <div>
                {preview ? (
                  <div className="image-preview">
                    <img src={preview} height="100" width="100" alt="" />
                    <button
                      className="btn mt-3 btn-info btn-sm"
                      onClick={handleImageUpload}
                    >
                      {uploading ? <Loader content="processing" /> : "Save"}
                    </button>
                  </div>
                ) : (
                  <div className="image-preview">
                    <img src={user?.image} height="100" width="100" alt="" />
                    <button
                      className="btn mt-3 btn-info btn-sm"
                      onClick={() => fileRef.current.click()}
                    >
                      Change Photo
                    </button>
                  </div>
                )}

                <div className="d-none">
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleImagePreview}
                  />
                </div>
              </div>
            </div>
            <hr />

            <ul className="nav flex-column">
              <li className="nav-item" onClick={() => setView(0)}>
                <a className="nav-link c-hand">
                  <i className="fas fa-user mr-2"></i> Update Information
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  {" "}
                  <i className="fas fa-credit-card mr-2"></i> Bank Details{" "}
                </a>
              </li> */}
              <li className="nav-item" onClick={() => setView(1)}>
                <a className="nav-link c-hand">
                  <i className="fas fa-key mr-2 "></i> Change Password{" "}
                </a>
              </li>
            </ul>
          </div>
          <div className="main-view p-2  mt-3 mt-lg-0  ">
            {view === 0 ? <UpdateInfo /> : <ChangePassword />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(settingsPage);

const ChangePassword = () => {
  const [info, setInfo] = useState({
    password1: "",
    password2: "",
    password3: "",
  });
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleChangePassword = async (e): Promise<void> => {
    e.preventDefault();
    if (info.password2 !== info.password3)
      return alert("Passwords don't match");
    // return console.log(info);
    try {
      await changePassword({
        variables: { password: info.password2, oldPassword: info.password1 },
      });

      alert("Password Updated");
    } catch (error) {
      CustomError(error);
    }
  };

  return (
    <div className="theme-card">
      <h5 className="heading">Change Password</h5>
      <hr />
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <input
            type="password"
            name="password1"
            className="form-control"
            placeholder="Enter your current password"
            value={info.password1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            className="form-control"
            placeholder="Enter new password"
            value={info.password2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password3"
            className="form-control"
            placeholder="Confirm new password"
            value={info.password3}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button className="btn text-info" disabled={loading}>
            {loading ? <Loader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

const UpdateInfo = () => {
  const user = useRecoilValue(UserAtom);
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [info, setInfo] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    state: user.state,
    account_number: user.account_number,
    bank: user.bank,
  });
  const handleChange = (e) => {
    const { value, name } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await updateUser({ variables: { input: info } });
      alert("SUCCESS !");
      router.reload();
    } catch (error) {
      CustomError(error);
    }
  };
  return (
    <div className="theme-card">
      <h5 className="heading">Update Information</h5>
      <hr />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={info.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={user?.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            value={info.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>State of Residence</label>
          <select
            className="form-control"
            name="state"
            value={info.state}
            onChange={handleChange}
          >
            {/* <option value=""></option> */}
            {allStates.map(({ state }, i) => (
              <option key={i}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="address"
            className="form-control"
            name="address"
            value={info.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bank Name</label>
          <input
            type="text"
            className="form-control"
            name="bank"
            value={info.bank}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input
            type="number"
            maxLength={10}
            placeholder="10 NUBAN Number"
            className="form-control"
            name="account_number"
            value={info.account_number || ""}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-danger btn-sm" type="reset">
            Cancel
          </button>
          <button className="btn btn-info btn-sm mx-3">
            {loading ? <Loader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};
