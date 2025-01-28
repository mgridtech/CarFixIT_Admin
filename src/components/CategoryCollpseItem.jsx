// components
import Collapse from "@mui/material/Collapse";
//import RatingStars from "@ui/RatingStars";
// import SubmenuTrigger from '@ui/SubmenuTrigger';
import { NavLink } from "react-router-dom";
import trash from "../assets/icons/trash.svg";

// hooks
import { useWindowSize } from "react-use";

// utils
import PropTypes from "prop-types";
import { getStatusColorNew } from "../utils/helpers";

const CategoryCollpseItem = ({ category, activeCollapse, handleCollapse }) => {
  const isExtraSmall = useWindowSize().width < 375;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="subheading-2">{category?.name}</span>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${
              activeCollapse === category?.id ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(category?.id)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
          <NavLink to="/product-editor" aria-label="Edit">
            <i className="icon icon-pen-to-square-regular" />
          </NavLink>
          <NavLink to="#" aria-label="Edit">
            <img src={trash} alt="trash" />
          </NavLink>
        </div>
      </div>
      <Collapse in={activeCollapse === category?.id}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Category</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{category?.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{category?.name}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{category?.time}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td className="capitalize">
                {isExtraSmall ? (
                  category?.status
                ) : (
                  <span
                    className="badge-status badge-status--lg"
                    style={{
                      backgroundColor: `var(--${getStatusColorNew(
                        `${category?.status}`.toLowerCase()
                      )})`,
                      width: "100%",
                    }}
                  >
                    {category?.status}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

CategoryCollpseItem.propTypes = {
  order: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};
export default CategoryCollpseItem;
