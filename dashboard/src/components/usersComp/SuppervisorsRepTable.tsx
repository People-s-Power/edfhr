import { SelectedUserAtom } from "atoms/UserAtom";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SuppervisorsRepTable = (): JSX.Element => {
  const user = useRecoilValue(SelectedUserAtom);
  return (
    <table className="table table-hover table-borderless">
      <tbody>
        {user?.reps?.map((rep, i) => (
          <tr key={i}>
            <td>
              <Link to={`/users/${rep?.id}`} className="text-decoration-none link-dark">
                {rep?.firstName} {rep?.lastName}{" "}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SuppervisorsRepTable;
