import { useQuery } from "@apollo/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GET_USERS, GET_USER_APPLICANTS } from "apollo/queries/userQuery";
import { ApplicantsAtom } from "atoms/ApplicantsAtom";
import { CampaignAtom } from "atoms/CampaignAtom";
import { MyApplicantsAtom, UserAtom, UsersAtom } from "atoms/UserAtom";
import axios from "axios";
import "bootstrap/dist/js/bootstrap";
import gql from "graphql-tag";
import cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HTTP_URI, SERVER_URL, TOKEN_NAME } from "utils/constants";
import Routes from "./router";
import io from "socket.io-client";
import dotenv from "dotenv";
import { getIP } from "utils";
import Cookies from "js-cookie";
dotenv.config();

console.log("SERVER_URL", process.env.REACT_APP_SERVER_URL);

export const socketClient = io(SERVER_URL);

const token = cookie.get(TOKEN_NAME);

axios.defaults.baseURL = HTTP_URI;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["authorization"] = token;

const App = (): JSX.Element => {
  const [user, setUser] = useRecoilState(UserAtom);
  const setApplicants = useSetRecoilState(ApplicantsAtom);
  const setUsers = useSetRecoilState(UsersAtom);
  const setMyApplicants = useSetRecoilState(MyApplicantsAtom);
  const isAuth = Boolean(cookie.get("user_id"));
  const setCampaigns = useSetRecoilState(CampaignAtom);
  const [loading, setLoading] = useState(true);
  useQuery(GET_APPLICANTS, {
    onCompleted: (data) => {
      setApplicants(data.getApplicants);
    },
    onError: (err) => console.log(err),
  });

  useQuery(GET_USERS, {
    onCompleted: (data) => {
      // console.log("from getUsers:", data);
      setUsers(data.getUsers);
    },
    onError: (err) => console.log(err),
  });

  useQuery(GET_USER_APPLICANTS, {
    variables: { id: user?.id },
    onCompleted: (data) => setMyApplicants(data.getUserApplicants),
    onError: (err) => console.log(err),
  });

  useQuery(GET_CAMPAIGNS, {
    onCompleted: (data) => setCampaigns(data.getCampaigns),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/auth/me");

        setUser(data);
        cookie.set("user_id", data.id);
        setLoading(false);
      } catch (error) {
        console.log(error);
        cookie.remove("user_id");
      }
    };
    if (!user) {
      checkAuth();
    }
  }, [user]);

  useEffect(() => {
    async function setIp() {
      const ip = await getIP();
      Cookies.set("ed_LOCAL", ip as string);
    }
    setIp();
  }, []);

  return <Routes loading={loading} isAuth={isAuth} />;
};

export default App;

const GET_APPLICANTS = gql`
  {
    getApplicants {
      id
      name
      amount_paid
      caseType
    }
  }
`;

const GET_CAMPAIGNS = gql`
  {
    getCampaigns {
      id
    }
  }
`;
