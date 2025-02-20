import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "../pages/Services/Services";

const UpdateCarbyModel = () => {
  const navigate = useNavigate();
  const { modelId } = useParams();
  console.log('fiejf',useParams());

  const [carData, setCarData] = useState({
    carYear: "",
    carYearId: "",
    transmissionIds: [],
    fuelTypeIds: [],
  });

  const [sessionData, setSessionData] = useState(null);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const parseSessionData = (carModelData) => {
    if (!carModelData) return null;
    try {
      return JSON.parse(carModelData);
    } catch (error) {
      console.error("Error parsing session data:", error);
      return null;
    }
  };

  const loadDropdownOptions = async () => {
    try {
      const [transmissionResponse, fuelResponse] = await Promise.all([
        Services.getInstance().getCarTransmission(),
        Services.getInstance().getCarFuelTypes(),
      ]);

      if (transmissionResponse?.data) {
        setTransmissionOptions(transmissionResponse.data);
      }
      if (fuelResponse?.data) {
        setFuelOptions(fuelResponse.data);
      }
    } catch (error) {
      console.error("Error loading dropdown options:", error);
      toast.error("Failed to load form options");
    }
  };

  const initializeFormData = (parsedData) => {
    if (!parsedData) return;

    const transmissionIdsArray = Array.isArray(parsedData.transmissionIds)
      ? parsedData.transmissionIds
      : parsedData.transmissionIds 
        ? [parsedData.transmissionIds] 
        : [];

    const fuelTypeIdsArray = Array.isArray(parsedData.fuelTypeIds)
      ? parsedData.fuelTypeIds
      : parsedData.fuelTypeIds 
        ? [parsedData.fuelTypeIds] 
        : [];

    setCarData({
      carYear: parsedData.carYear || "",
      carYearId: parsedData.carYearId || "",
      transmissionIds: transmissionIdsArray,
      fuelTypeIds: fuelTypeIdsArray,
    });
  };

  useEffect(() => {
    const loadAllData = async () => {
      setIsDataLoading(true);
      try {
        const parsedData = parseSessionData(sessionStorage.getItem("carModelData"));
        setSessionData(parsedData);

        await loadDropdownOptions();
        initializeFormData(parsedData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load form data");
      } finally {
        setIsDataLoading(false);
      }
    };

    loadAllData();
  }, [modelId]);

  const handleCheckboxChange = (id, fieldName) => {
    setCarData((prev) => {
      const currentIds = [...prev[fieldName]];
      const idStr = String(id);
      const idIndex = currentIds.findIndex((item) => String(item) === idStr);

      if (idIndex >= 0) {
        currentIds.splice(idIndex, 1);
      } else {
        currentIds.push(id);
      }

      return { ...prev, [fieldName]: currentIds };
    });
  };

  const isChecked = (id, selectedIds) => 
    selectedIds.some((selectedId) => String(selectedId) === String(id));

  const getSelectedNames = (options, selectedIds) => {
    if (!selectedIds?.length || !options?.length) return "None selected";

    const names = selectedIds
      .map((id) => options.find((opt) => String(opt.id) === String(id))?.name)
      .filter(Boolean);

    return names.length ? names.join(", ") : "None selected";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!carData.transmissionIds.length || !carData.fuelTypeIds.length) {
      toast.error("Please select at least one transmission type and fuel type");
      return;
    }
  
    try {
      setLoading(true);
  
      const payload = {
        adminCarId: modelId, // Include adminCarId in the payload
        transmissionIds: carData.transmissionIds,
        fuelTypeIds: carData.fuelTypeIds,
      };
  
      await Services.getInstance().updateCarByModel(modelId, payload);
  
      // Update session storage with new data
      if (sessionData) {
        const updatedSessionData = {
          ...sessionData,
          transmissionIds: carData.transmissionIds,
          fuelTypeIds: carData.fuelTypeIds,
          transmission: getSelectedNames(transmissionOptions, carData.transmissionIds),
          fuelType: getSelectedNames(fuelOptions, carData.fuelTypeIds),
        };
        sessionStorage.setItem("carModelData", JSON.stringify(updatedSessionData));
      }
  
      toast.success("Car model updated successfully!");
      setTimeout(() => navigate("/car-model-management"), 2000);
    } catch (error) {
      console.error("Error updating car model:", error);
      toast.error(error.message || "Failed to update car model");
    } finally {
      setLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex justify-center items-center">
        <div className="text-xl text-gray-600 dark:text-gray-200">Loading car model data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-widget">
      <PageHeader title="Update Car Model" />
      <ToastContainer />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-widget rounded-lg shadow-sm p-6">
          <Spring type="slideUp" duration={400} delay={300}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Selected Year
                </label>
                <div className="p-3 bg-widget rounded-md text-gray-700 dark:text-gray-200">
                  {carData.carYear || "No year selected"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-widget rounded-md mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    Currently Selected Transmissions
                  </h3>
                  <p className="mt-1 text-blue-900 dark:text-blue-100">
                    {getSelectedNames(transmissionOptions, carData.transmissionIds)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    Currently Selected Fuel Types
                  </h3>
                  <p className="mt-1 text-blue-900 dark:text-blue-100">
                    {getSelectedNames(fuelOptions, carData.fuelTypeIds)}
                  </p>
                </div>
              </div>

              <CheckboxSection
                label="Update Transmission Type"
                options={transmissionOptions}
                selectedIds={carData.transmissionIds}
                fieldName="transmissionIds"
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
              />

              <CheckboxSection
                label="Update Fuel Type"
                options={fuelOptions}
                selectedIds={carData.fuelTypeIds}
                fieldName="fuelTypeIds"
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
              />

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn--primary"
                >
                  {loading ? "Updating..." : "Save Car Model"}
                </button>
              </div>
            </form>
          </Spring>
        </div>
      </div>
    </div>
  );
};

const CheckboxSection = ({
  label,
  options,
  selectedIds,
  fieldName,
  handleCheckboxChange,
  isChecked,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
      {label}
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-gray-200 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-600">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            type="checkbox"
            id={`${fieldName}-${option.id}`}
            checked={isChecked(option.id, selectedIds)}
            onChange={() => handleCheckboxChange(option.id, fieldName)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-500 rounded"
          />
          <label
            htmlFor={`${fieldName}-${option.id}`}
            className="ml-2 block text-sm text-gray-700 dark:text-gray-200"
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
    {!options.length && (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No options available
      </p>
    )}
  </div>
);

export default UpdateCarbyModel;