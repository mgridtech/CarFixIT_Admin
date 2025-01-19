// components
import Collapse from "@mui/material/Collapse";

// utils
import PropTypes from "prop-types";
import { getStatusColor } from "../utils/helpers";
import Timestamp from "../ui/Timestamp";

const TransactionCollapseItem = ({
  transaction,
  activeCollapse,
  handleCollapse,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[18px]">
          <span className="h6 hidden truncate xs:inline">{transaction.id}</span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            className={`collapse-btn ${
              activeCollapse === transaction.sku ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(transaction.sku)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
        </div>
      </div>
      <Collapse in={activeCollapse === transaction.sku}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td>Order Id</td>
              <td>{transaction.id}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <span
                  className="badge-status"
                  style={{
                    backgroundColor: `var(--${getStatusColor(
                      transaction.orderStatus
                    )})`,
                    width: "100%",
                  }}
                >
                  {transaction.orderStatus}
                </span>
              </td>
            </tr>
            <tr>
              <td>Date & Time</td>
              <td>
                <Timestamp date={transaction.updatedAt} />
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{transaction.totalPrice} SAR</td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

TransactionCollapseItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default TransactionCollapseItem;
