// components
import Collapse from "@mui/material/Collapse";
//import RatingStars from "@ui/RatingStars";
// import SubmenuTrigger from '@ui/SubmenuTrigger';
import { NavLink } from "react-router-dom";
import trash from "../assets/icons/trash.svg";
import Counter from "../components/Counter";
import Spring from "../components/Spring";
import img1 from "../assets/avatar.webp";
// hooks

// utils
import PropTypes from "prop-types";
import { useState } from "react";
import ShowOrderStatsGraph from "./ShowOrderStatsGraph";
import ShowOrderRevenueGraph from "./ShowOrderRevenueGraph";
const TeamCollapseItemTable = ({ data }) => {
  const [activeCollapse, setactiveCollapse] = useState(false);
  const handleCollapse = () => {
    setactiveCollapse(!activeCollapse);
  };
  const TeamMembers = [
    { id: 0, img: img1, name: "John William" },
    { id: 1, img: img1, name: "Thomas William" },
    { id: 2, img: img1, name: "Omar Shahbaaz" },
    { id: 3, img: img1, name: "Mohammad Omar" },
  ];
  const TeamMembersItem = ({ image, name }) => {
    return (
      <div
        style={{
          width: "auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            src={image}
            alt="user"
          />
        </div>
        <div>{name}</div>
      </div>
    );
  };
  return (
    <div className="card mb-2">
      <div
        style={{ cursor: "pointer" }}
        onClick={handleCollapse}
        className="flex items-center justify-between"
      >
        <span className="subheading-1">{data?.name}</span>
        <div className="flex items-center gap-4">
          <span className="subheading-2">({data?.rating})</span>
          <button
            className={`collapse-btn ${activeCollapse ? "active" : ""}`}
            aria-label="Toggle view"
            onClick={handleCollapse}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={activeCollapse}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Team Performance</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{data?.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{data?.name}</td>
            </tr>

            <tr>
              <td colSpan={2}>
                <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between mb-[20px]">
                  <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
                    <div className="flex gap-3" style={{ width: "100%" }}>
                      <div className="badge-icon bg-green">
                        <h1 class="text-[30px] mt-1">$</h1>
                      </div>
                      <div>
                        <Counter
                          className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                          num={15412}
                          prefix=""
                        />
                        <span className="block label-text mb-2">
                          Order Revenue
                        </span>
                      </div>
                    </div>
                  </Spring>
                  <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
                    <div className="flex gap-3" style={{ width: "100%" }}>
                      <div className="badge-icon bg-accent">
                        <i className="icon-boxes-stacked-regular text-[23px] mt-1" />
                      </div>
                      <div>
                        <Counter
                          className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                          num={5412}
                        />
                        <span className="block label-text mb-2">
                          Number Of Orders
                        </span>
                      </div>
                    </div>
                  </Spring>
                  <Spring className="card flex-1 grid  xl:pt-[33px] xl:pb-5 xl:pr-[31px] xl:pl-[37px] mt-[10px]">
                    <div className="flex gap-3" style={{ width: "100%" }}>
                      <div className="badge-icon bg-yellow">
                        <i className="icon-star-half-stroke-solid text-[23px] mt-1" />
                      </div>
                      <div>
                        <span className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]">
                          {data?.rating}
                        </span>
                        <span className="block label-text mb-2">
                          Supervisor Evolution
                        </span>
                      </div>
                    </div>
                  </Spring>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>Team Members</td>
            </tr>
            <tr>
              <div
                className="flex items-center justify-start"
                style={{
                  flexDirection: "row",
                  width: "97%",
                  margin: "20px auto",
                }}
              >
                {TeamMembers?.length > 0 ? (
                  TeamMembers?.map((dat) => (
                    <TeamMembersItem
                      key={dat.id}
                      image={dat.img}
                      name={dat.name}
                    />
                  ))
                ) : (
                  <span>No team members to show</span>
                )}
              </div>
            </tr>
            <tr>
              <td colSpan={2}>
                <ShowOrderStatsGraph />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <ShowOrderRevenueGraph />
              </td>
            </tr>
            <tr>
              <td>Actions</td>
              <td>
                <NavLink to="#" aria-label="Edit">
                  <img
                    src={trash}
                    style={{ height: "25px", objectFit: "contain" }}
                    alt="trash"
                  />
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

TeamCollapseItemTable.propTypes = {
  data: PropTypes.object.isRequired,
};
export default TeamCollapseItemTable;
