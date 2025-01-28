import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment'; // Import moment for date handling

const { RangePicker } = DatePicker;

const CalendarSelector = ({ wrapperClass, id, onChange, value }) => {
  useEffect(() => {
    // Set initial value from localStorage if available
    const storedRange = JSON.parse(localStorage.getItem("selectedDateRange"));
    if (storedRange && Array.isArray(storedRange) && storedRange.length === 2) {
      onChange(storedRange.map(date => date ? moment(date) : null)); // Convert stored dates to moment objects
    }
  }, [onChange]);

  const handleDateChange = (dates, dateStrings) => {
    if (onChange) {
      onChange(dates); // dates will already be moment objects
      // Update localStorage with selected date range
      localStorage.setItem("selectedDateRange", JSON.stringify(dateStrings));
    }
  };

  // Ensure value is always an array
  const selectedValue = Array.isArray(value) ? value.map(date => date ? moment(date) : null) : [];

  // Function to disable future dates
  const disabledDate = current => {
    // Disable dates after today (including today)
    return current && current > moment().endOf('day');
  };

  return (  
    <div className={`flex items-center ${wrapperClass}`} id={id}>
      <RangePicker
        className="w-full"
        value={selectedValue}
        onChange={handleDateChange}
        style={{ maxWidth: '400px' }} // Example of inline style
        disabledDate={disabledDate} // Apply the disabledDate function
      />
    </div>
  );
};

export default CalendarSelector;
