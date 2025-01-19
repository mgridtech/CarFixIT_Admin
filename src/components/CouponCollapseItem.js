import React from 'react';
import PropTypes from 'prop-types';

const CouponCollapseItem = ({ coupon, handleCollapse, activeCollapse }) => {
  const { id, couponCode, discountType, discountValue, status, updatedAt } = coupon;

  return (
    <div
      className={`coupon-collapse-item ${activeCollapse === id ? 'active' : ''}`}
      onClick={() => handleCollapse(id)}
    >
      <div className="header flex justify-between items-center p-4 border-b">
        <div className="details flex flex-col">
          <span className="coupon-code font-bold">{couponCode}</span>
          <span className="discount-type text-sm">{discountType}</span>
        </div>
        <div className="actions flex items-center">
          <span className="discount-value font-bold">{discountValue}</span>
          <label className="switch ml-4">
            <input type="checkbox" checked={status} readOnly />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      {activeCollapse === id && (
        <div className="content p-4">
          <p className="text-sm">Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
          {/* Add more content or actions here as needed */}
        </div>
      )}
    </div>
  );
};

CouponCollapseItem.propTypes = {
  coupon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    couponCode: PropTypes.string.isRequired,
    discountType: PropTypes.string.isRequired,
    discountValue: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  handleCollapse: PropTypes.func.isRequired,
  activeCollapse: PropTypes.string.isRequired,
};

export default CouponCollapseItem;
