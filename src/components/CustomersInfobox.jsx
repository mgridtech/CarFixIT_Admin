// components/CustomersInfobox.js

import Spring from "../components/Spring";
import Counter from "../components/Counter";
import PropTypes from "prop-types";

const CustomersInfobox = ({
  iconClass = "users-solid",
  color = "accent",
  label = "All",
  carlabel = "Cars",
  customerlabel = "Customers",
  count = 0,
  customer = true,
  suffix,
  isCarManagement = false,
}) => {
  return (
    <Spring className="card flex flex-col justify-center md:items-center">
      <div className={`badge-icon badge-icon--sm bg-${color}`}>
        <i className={`icon-${iconClass} text-base`} />
      </div>
      {count > 0 ? (
        <div className="mt-3 mb-4">
          <Counter className="h2 md:text-[32px]" num={count} suffix={suffix} />
        </div>
      ) : (
        <div className="mt-3 mb-4" />
      )}
      <h6>
        {label} {isCarManagement ? carlabel : customerlabel}
        {customer && <span className="xl:hidden 4xl:inline"> {isCarManagement}</span>}
      </h6>
    </Spring>
  );
};

CustomersInfobox.propTypes = {
  iconClass: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.number,
  customer: PropTypes.bool,
  suffix: PropTypes.string,
  isCarManagement: PropTypes.bool,
};

export default CustomersInfobox;
