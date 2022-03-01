import { useQuery, useSubscription } from "@apollo/client";
import {
  APPLICANT_SUBSCRIPTION,
  GET_APPLICANT_SUBSCRIPTION,
} from "apollo/queries/applicantQuery";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar } from "rsuite";

export const ApplicantSubscription = () => {
  // const { action, data } = payload;
  const [notifications, setNotification] = useState([]);
  useSubscription(APPLICANT_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: { data } }) =>
      setNotification(data.applicantSubscription),
  });

  useQuery(GET_APPLICANT_SUBSCRIPTION, {
    onCompleted: (data) => setNotification(data.getApplicantSub),
    onError: (err) => console.log(err),
  });

  return [...notifications]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .map((sub, i) => {
      const { user, name, time, _id, action } = sub;
      return (
        <Link href={`/applicants/${_id}`} key={i}>
          <div className="note-card d-flex p-2 align-items-center">
            <Avatar className="mr-2" circle src={user.image} />

            <div className="d-flex flex-column">
              <p className="mb-0">
                {user.name} {action.toLowerCase()} {name}
              </p>
              <small>{dayjs(time).fromNow()}</small>
            </div>
          </div>
        </Link>
      );
    });
};
