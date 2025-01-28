import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const CategoryManagementCollapseItem = ({ category, handleDelete }) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <h6 className="text-sm">{category?.nameEng}</h6>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${isExpand ? "active" : ""}`}
            aria-label="Toggle view"
            onClick={() => setIsExpand(!isExpand)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={isExpand}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Category Details</td>
            </tr>
            <tr>
              <td>Category Id:</td>
              <td>{category?.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{category?.nameEng}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{category?.status}</td>
            </tr>
            <tr>
              <td>Created At:</td>
              <td>{category?.createdAt}</td>
            </tr>
            <tr>
              <td>Actions:</td>
              <td>
                <div className="flex items-center justify-evenly gap-11">
                  <button
                    onClick={() => alert(`Navigating to edit category ${category.id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(category.id)}>Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

export default CategoryManagementCollapseItem;
