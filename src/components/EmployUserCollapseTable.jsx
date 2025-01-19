// components
import Collapse from "@mui/material/Collapse";
//import RatingStars from "@ui/RatingStars";
// import SubmenuTrigger from '@ui/SubmenuTrigger';
import trash from "../assets/icons/trash.svg";

// hooks

// utils
import PropTypes from "prop-types";
import ShowTeamInfo from "./ShowTeamInfo";
import { removeData } from "../db/databaseFunction";
import { toast } from "react-toastify";
import { useState } from "react";

const EmployUserCollapseTable = ({ user, activeCollapse, handleCollapse }) => {
  const [showExtra, setshowExtra] = useState(false);
  const deleteOrder = async (id) => {
    if (
      !window.confirm(`Are you sure you want to delete Employ with id ${id}?`)
    ) {
      return;
    } else {
      await removeData("employ", id)
        .then(() => {
          toast.success("Employ Deleted");
        })
        .catch((e) => {
          toast.error(`Error: ${e}`);
        });
    }
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="subheading-2">#{user?.dbId}</span>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${showExtra ? "active" : ""}`}
            aria-label="Toggle view"
            onClick={() => setshowExtra(!showExtra)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={showExtra}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Employ</td>
            </tr>
            <tr></tr>
            <tr>
              <td>Job Id</td>
              <td>{user?.jobId}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user?.phone}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>
                {user?.role === "SingleTeam"
                  ? "Single Team"
                  : user?.role === "SingleDTeam"
                  ? "Dedicated Team"
                  : user?.role === "supervisor"
                  ? "Supervisor"
                  : user?.role === "dev"
                  ? "Developer"
                  : user?.role === "admin"
                  ? "Admin"
                  : ""}
              </td>
            </tr>

            <tr>
              <td>Team Info</td>
              <td className="capitalize">
                <ShowTeamInfo teamInfo={user?.teamInfo} />
              </td>
            </tr>
            <tr>
              <td>Action</td>
              <td className="capitalize">
                <div className="flex items-center justify-center gap-11">
                  <button
                    onClick={() => deleteOrder(user.dbId)}
                    aria-label="Edit"
                  >
                    <img src={trash} alt="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

EmployUserCollapseTable.propTypes = {
  order: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default EmployUserCollapseTable;
