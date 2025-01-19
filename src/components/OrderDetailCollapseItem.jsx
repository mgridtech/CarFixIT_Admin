// components
import Collapse from "@mui/material/Collapse";
//import RatingStars from "@ui/RatingStars";
// import SubmenuTrigger from '@ui/SubmenuTrigger';

// hooks

// utils
import PropTypes from "prop-types";
import { useState } from "react";

const OrderDetailCollapseItem = ({ category }) => {
  const [isExpand, setisExpand] = useState(false);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="subheading-2">{category?.productNameEng}</span>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${isExpand ? "active" : ""}`}
            aria-label="Toggle view"
            onClick={() => setisExpand(!isExpand)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={isExpand}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>Product</td>
            </tr>
            <tr>
              <td>Name (EN)</td>
              <td>{category?.productNameEng}</td>
            </tr>
            <tr>
              <td>Name (AR)</td>
              <td>{category?.productNameArab}</td>
            </tr>
            <tr>
              <td>Description (EN)</td>
              <td>{category?.productDescEng}</td>
            </tr>
            <tr>
              <td>Description (AR)</td>
              <td>{category?.productDescArab}</td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td>{category?.quantity}</td>
            </tr>
            <tr>
              <td>Price (1)</td>
              <td>
                {category?.type?.length > 0
                  ? category?.type === "original"
                    ? category?.originalPrice
                    : category?.commercialPrice
                  : category?.originalPrice}{" "}
                SAR
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

OrderDetailCollapseItem.propTypes = {
  order: PropTypes.object.isRequired,
};
export default OrderDetailCollapseItem;
