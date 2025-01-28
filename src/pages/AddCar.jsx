import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";

const AddCar = () => {
  const navigate = useNavigate();

  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    selectedYears: [],
  });

  const [availableYears] = useState(
    Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i) // Generate last 30 years
  );

  const handleToggleYear = (year) => {
    setCarData((prev) => ({
      ...prev,
      selectedYears: prev.selectedYears.includes(year)
        ? prev.selectedYears.filter((y) => y !== year)
        : [...prev.selectedYears, year],
    }));
  };

  const handleAddYears = () => {
    if (carData.selectedYears.length === 0) {
      alert("Please select at least one year to add.");
      return;
    }
    alert(`Years Added: ${carData.selectedYears.join(", ")}`);
  };

  return (
    <>
      <PageHeader title="Add Car" />

      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full max-w-[560px]"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form className="mt-5 flex flex-col gap-5">
            {/* Brand Dropdown */}
            <div className="field-wrapper">
              <label htmlFor="brand" className="field-label">
                Brand<span className="text-red-500">*</span>
              </label>
              <select
                className="field-input"
                id="brand"
                required
                value={carData.brand}
                onChange={(e) => setCarData({ ...carData, brand: e.target.value })}
              >
                <option value="">Select Brand</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
              </select>
            </div>

            {/* Model Input */}
            <div className="field-wrapper">
              <label htmlFor="model" className="field-label">
                Model<span className="text-red-500">*</span>
              </label>
              <input
                className="field-input"
                required
                id="model"
                type="text"
                placeholder="Car model"
                value={carData.model}
                onChange={(e) => setCarData({ ...carData, model: e.target.value })}
              />
            </div>

            {/* Year Selection with Checkboxes */}
            <div className="field-wrapper">
              <label htmlFor="years" className="field-label">
                Years<span className="text-red-500">*</span>
              </label>
              <div className="overflow-y-auto max-h-[200px] bg-white border rounded-lg p-3">
                {availableYears.map((year, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`year-${year}`}
                      value={year}
                      checked={carData.selectedYears.includes(year)}
                      onChange={() => handleToggleYear(year)}
                    />
                    <label htmlFor={`year-${year}`}>{year}</label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn--primary px-4 py-2 mt-3"
                onClick={handleAddYears}
              >
                Add Selected Years
              </button>
            </div>

            {/* Display Added Years */}
            {carData.selectedYears.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-bold mb-2">Selected Years:</h3>
                <ul className="flex flex-wrap gap-2">
                  {carData.selectedYears.map((year, index) => (
                    <li
                      key={index}
                      className="bg-gray-200 text-sm px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      {year}
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleToggleYear(year)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-center gap-5 mt-6">
              <button
                type="button"
                className="btn btn--success px-10 py-3"
                onClick={() => navigate("/car-management")}
              >
                Save and Continue
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddCar;
