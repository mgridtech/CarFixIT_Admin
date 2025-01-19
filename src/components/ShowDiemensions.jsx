import React, { useState } from "react";
import { getStatusColorNew } from "../utils/helpers";

const ShowDiemensions = ({ dim }) => {
  const [isExpand, setisExpand] = useState(false);
  return (
    <>
      <button
        className="badge-status badge-status--lg"
        style={{
          backgroundColor: `var(--${getStatusColorNew(
            !isExpand ? "active" : "inactive"
          )})`,
          marginBottom: isExpand ? "15px" : "0px",
        }}
        onClick={() => setisExpand(!isExpand)}
      >
        Show {isExpand ? "Less" : "More"}
      </button>
      {isExpand ? (
        <table className="w-full text-sm" style={{ textAlign: "left" }}>
          <thead className="text-xs uppercase">
            <tr>
              <th>English</th>
              <th>Arabic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {dim &&
              dim?.map((dat, index) => (
                <tr key={index}>
                  <td>{dat.nameEng}</td>
                  <td>{dat.nameArab}</td>
                  <td>{dat.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default ShowDiemensions;
