import Collapse from "@mui/material/Collapse";
import React, { useState } from "react";
import Counter from "./Counter";

function ServiceItemCustom({ data }) {
  const [activeCollapse, setactiveCollapse] = useState(false);
  const handleCollapse = () => {
    setactiveCollapse(!activeCollapse);
  };
  return (
    <div className="card mt-2">
      <div
        style={{ cursor: "pointer" }}
        onClick={handleCollapse}
        className="flex items-center justify-between"
      >
        <span className="h5">{data?.name}</span>
        <div className="flex items-center gap-4">
          <span className="h5">
            <Counter className="h5" num={data?.value} />%
          </span>
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
            {data?.byBrand?.length > 0 && (
              <>
                <tr>
                  <td colSpan={2}>By Brand</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.byBrand.map((dat, index) => (
                      <div
                        className="flex pt-3 pb-3 items-center justify-between"
                        style={{
                          borderBottom:
                            data?.byBrand?.length !== index + 1
                              ? "1px solid grey"
                              : "0px solid grey",
                        }}
                      >
                        <span className="subheading-1">{dat?.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="subheading-2">
                            <Counter
                              className="subheading-2"
                              num={dat?.value}
                            />
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            )}
            {data?.byType?.length > 0 && (
              <>
                <tr>
                  <td colSpan={2}>By Type</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.byType.map((dat, index) => (
                      <div
                        className="flex pt-3 pb-3 items-center justify-between"
                        style={{
                          borderBottom:
                            data?.byType?.length !== index + 1
                              ? "1px solid grey"
                              : "0px solid grey",
                        }}
                      >
                        <span className="subheading-1">{dat?.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="subheading-2">
                            <Counter
                              className="subheading-2"
                              num={dat?.value}
                            />
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            )}
            {data?.byCity?.length > 0 && (
              <>
                <tr>
                  <td colSpan={2}>By City</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.byCity.map((dat, index) => (
                      <div
                        className="flex pt-3 pb-3 items-center justify-between"
                        style={{
                          borderBottom:
                            data?.byCity?.length !== index + 1
                              ? "1px solid grey"
                              : "0px solid grey",
                        }}
                      >
                        <span className="subheading-1">{dat?.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="subheading-2">
                            <Counter
                              className="subheading-2"
                              num={dat?.value}
                            />
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            )}
            {data?.byCar?.length > 0 && (
              <>
                <tr>
                  <td colSpan={2}>By Car</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.byCar.map((dat, index) => (
                      <div
                        className="flex pt-3 pb-3 items-center justify-between"
                        style={{
                          borderBottom:
                            data?.byCar?.length !== index + 1
                              ? "1px solid grey"
                              : "0px solid grey",
                        }}
                      >
                        <span className="subheading-1">{dat?.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="subheading-2">
                            <Counter
                              className="subheading-2"
                              num={dat?.value}
                            />
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            )}
            {data?.byTeam?.length > 0 && (
              <>
                <tr>
                  <td colSpan={2}>By Team</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.byTeam.map((dat, index) => (
                      <div
                        className="flex pt-3 pb-3 items-center justify-between"
                        style={{
                          borderBottom:
                            data?.byTeam?.length !== index + 1
                              ? "1px solid grey"
                              : "0px solid grey",
                        }}
                      >
                        <span className="subheading-1">{dat?.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="subheading-2">
                            <Counter
                              className="subheading-2"
                              num={dat?.value}
                            />
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            )}
            {data?.byNeighbourhod?.length > 0 && (
              <>
                <tr>
                  <td colSpan={2}>By Neighborhood</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.byNeighbourhod.map((dat, index) => (
                      <div
                        className="flex pt-3 pb-3 items-center justify-between"
                        style={{
                          borderBottom:
                            data?.byNeighbourhod?.length !== index + 1
                              ? "1px solid grey"
                              : "0px solid grey",
                        }}
                      >
                        <span className="subheading-1">{dat?.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="subheading-2">
                            <Counter
                              className="subheading-2"
                              num={dat?.value}
                            />
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </Collapse>
    </div>
  );
}

export default ServiceItemCustom;
