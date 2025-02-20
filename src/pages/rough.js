import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "../pages/Services/Services";

const AddCarForm2 = () => {
  const { model } = useParams(); // Get the model ID from the URL
  const navigate = useNavigate();

  const [selectedYears, setSelectedYears] = useState([]);
  const [transmissionTypes, setTransmissionTypes] = useState({});
  const [fuelTypes, setFuelTypes] = useState({});
  const [availableYears, setAvailableYears] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [errors, setErrors] = useState({
    selectedYears: "",
    transmissionTypes: {},
    fuelTypes: {},
  });

  useEffect(() => {
    const fetchCarYears = async () => {
      try {
        const response = await Services.getInstance().getCarYears();
        if (response.error) {
          console.error("Error fetching car years:", response.error);
        } else {
          setAvailableYears(response.data);
        }
      } catch (error) {
        console.error("Error fetching car years:", error);
      }
    };

    const fetchCarTransmissions = async () => {
      try {
        const response = await Services.getInstance().getCarTransmission();
        if (response.error) {
          console.error("Error fetching car transmissions:", response.error);
        } else {
          setTransmissionOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching car transmissions:", error);
      }
    };

    const fetchCarFuelTypes = async () => {
      try {
        const response = await Services.getInstance().getCarFuelTypes();
        if (response.error) {
          console.error("Error fetching car fuel types:", response.error);
        } else {
          setFuelOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching car fuel types:", error);
      }
    };

    fetchCarYears();
    fetchCarTransmissions();
    fetchCarFuelTypes();
  }, []);

  const handleToggleYear = (yearId) => {
    setSelectedYears((prev) =>
      prev.includes(yearId) ? prev.filter((id) => id !== yearId) : [...prev, yearId]
    );
    setErrors((prev) => ({ ...prev, selectedYears: "" }));
  };

  const handleTransmissionTypeChange = (year, value) => {
    setTransmissionTypes((prev) => ({
      ...prev,
      [year]: Array.isArray(prev[year])
        ? prev[year].includes(value)
          ? prev[year].filter((id) => id !== value)
          : [...prev[year], value]
        : [value],
    }));
    setErrors((prev) => ({
      ...prev,
      transmissionTypes: {
        ...prev.transmissionTypes,
        [year]: "",
      },
    }));
  };

  const handleFuelTypeChange = (year, value) => {
    setFuelTypes((prev) => ({
      ...prev,
      [year]: Array.isArray(prev[year])
        ? prev[year].includes(value)
          ? prev[year].filter((id) => id !== value)
          : [...prev[year], value]
        : [value],
    }));
    setErrors((prev) => ({
      ...prev,
      fuelTypes: {
        ...prev.fuelTypes,
        [year]: "",
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {
      selectedYears: "",
      transmissionTypes: {},
      fuelTypes: {},
    };
    let isValid = true;

    if (selectedYears.length === 0) {
      newErrors.selectedYears = "Please select at least one year.";
      isValid = false;
    }

    selectedYears.forEach((year) => {
      if (!transmissionTypes[year] || transmissionTypes[year].length === 0) {
        newErrors.transmissionTypes[year] = "At least one transmission type is required.";
        isValid = false;
      }
      if (!fuelTypes[year] || fuelTypes[year].length === 0) {
        newErrors.fuelTypes[year] = "At least one fuel type is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const carDetails = selectedYears.map((yearId) => [
          yearId,
          transmissionTypes[yearId].map(Number),
          fuelTypes[yearId].map(Number),
        ]);

        const formattedData = {
          modelId: Number(model),
          carDetails: carDetails,
        };

        console.log("Sending data:", formattedData);

        const response = await Services.getInstance().addAdminCarWithFormData(formattedData);

        if (response.error) {
          alert("Error adding admin car: " + response.error);
        } else {
          console.log("Admin car added successfully:", response);
          alert("Car data saved successfully!");
          navigate("/car-model-management");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while saving the car data.");
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <>
      <PageHeader title="Add Car" />
      <div className="bg-widget w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="w-full"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-6">
            {/* Year Selection with Checkboxes */}
            <div className="field-wrapper bg-widget p-6 rounded-lg shadow-sm">
              <label htmlFor="years" className="field-label block text-lg font-medium mb-4">
                Years<span className="text-red-500">*</span>
              </label>
              <div className="overflow-y-auto max-h-[200px] pr-4">
                {availableYears.map((yearObj) => (
                  <div key={yearObj.id} className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      id={`year-${yearObj.id}`}
                      value={yearObj.id}
                      checked={selectedYears.includes(yearObj.id)}
                      onChange={() => handleToggleYear(yearObj.id)}
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`year-${yearObj.id}`} className="text-gray-700">
                      {yearObj.year}
                    </label>
                  </div>
                ))}
              </div>
              {errors.selectedYears && (
                <p className="text-red-500 text-sm mt-2">{errors.selectedYears}</p>
              )}
            </div>

            {/* Selected Years Container with improved design */}
            {selectedYears.length > 0 && (
              <div className="bg-gray-50 border-2 border-indigo-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Selected Year Models</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedYears.map((yearId) => {
                    const yearObj = availableYears.find((y) => y.id === yearId);
                    return (
                      <div 
                        key={yearId} 
                        className="bg-widget rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="border-b border-gray-100 p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xl text-gray-800">{yearObj?.year}</span>
                            <button
                              type="button"
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                              onClick={() => handleToggleYear(yearId)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="p-4">
                          {/* Transmission Type Checkboxes */}
                          <div className="mb-6">
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">
                              Transmission Types
                            </label>
                            <div className="space-y-2">
                              {transmissionOptions.map((transmission) => (
                                <div key={transmission.id} className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    id={`transmission-${yearId}-${transmission.id}`}
                                    value={transmission.id}
                                    checked={
                                      Array.isArray(transmissionTypes[yearId]) &&
                                      transmissionTypes[yearId].includes(transmission.id)
                                    }
                                    onChange={() => handleTransmissionTypeChange(yearId, transmission.id)}
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label 
                                    htmlFor={`transmission-${yearId}-${transmission.id}`}
                                    className="text-sm text-gray-600 select-none"
                                  >
                                    {transmission.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {errors.transmissionTypes[yearId] && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.transmissionTypes[yearId]}
                              </p>
                            )}
                          </div>

                          {/* Fuel Type Checkboxes */}
                          <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">
                              Fuel Types
                            </label>
                            <div className="space-y-2">
                              {fuelOptions.map((fuel) => (
                                <div key={fuel.id} className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    id={`fuel-${yearId}-${fuel.id}`}
                                    value={fuel.id}
                                    checked={
                                      Array.isArray(fuelTypes[yearId]) &&
                                      fuelTypes[yearId].includes(fuel.id)
                                    }
                                    onChange={() => handleFuelTypeChange(yearId, fuel.id)}
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label 
                                    htmlFor={`fuel-${yearId}-${fuel.id}`}
                                    className="text-sm text-gray-600 select-none"
                                  >
                                    {fuel.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {errors.fuelTypes[yearId] && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.fuelTypes[yearId]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="btn btn--primary"
              >
                Save Car Model
              </button>
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default AddCarForm2;