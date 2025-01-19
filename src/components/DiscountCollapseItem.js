import React from 'react';
import PropTypes from 'prop-types';

const DiscountCollapseItem = ({ discount, handleCollapse, activeCollapse }) => {
  const { id, category, type, value, status, updatedAt } = discount;

  return (
    <div
      className={`discount-collapse-item ${activeCollapse === id ? 'active' : ''}`}
      onClick={() => handleCollapse(id)}
    >
      <div className="header flex justify-between items-center p-4 border-b">
        <div className="details flex flex-col">
          <span className="category font-bold">{category}</span>
          <span className="type text-sm">{type}</span>
        </div>
        <div className="actions flex items-center">
          <span className="value font-bold">{value}</span>
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

DiscountCollapseItem.propTypes = {
  discount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  handleCollapse: PropTypes.func.isRequired,
  activeCollapse: PropTypes.string.isRequired,
};

export default DiscountCollapseItem;
