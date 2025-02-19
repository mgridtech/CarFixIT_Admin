// components
import ProgressBar from "../ui/ProgressBar";

// utils
import PropTypes from "prop-types";

const LabeledProgressBar = ({
  label,
  value,
  displayValue,
  color,
  withBar = true,
  wrapperClass,
}) => {
  return (
    <div className={`flex flex-col gap-[5px] ${wrapperClass || ""}`}>
      <div className="flex items-center justify-between">
        <span className="h6 !text-sm !text-body-text">{label}</span>
        <span className="text-header h6 !text-sm">{displayValue}</span>
      </div>
      {withBar && <ProgressBar value={value} color={color} />}
    </div>
  );
};

LabeledProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  displayValue: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["accent", "red", "green", "yellow", "header"]),
  withBar: PropTypes.bool,
  wrapperClass: PropTypes.string,
};

export default LabeledProgressBar;
