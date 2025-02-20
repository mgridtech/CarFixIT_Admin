// service.js
async updateCarByModel(adminCarId, payload) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // No need to include adminCarId in payload since it's in the URL
    const requestBody = JSON.stringify({
      transmissionIds: payload.transmissionIds,
      fuelTypeIds: payload.fuelTypeIds
    });

    const response = await fetch(`${baseURL}/adminCar/${adminCarId}/update`, {
      method: "PATCH",
      headers: headers,
      body: requestBody,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating car by model");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating car by model:", error);
    throw error;
  }
}

// UpdateCarbyModel.jsx
const UpdateCarbyModel = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // This gets the adminCarId from URL

  // ... keep other state declarations and useEffects ...

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carData.transmissionIds.length || !carData.fuelTypeIds.length) {
      toast.error("Please select at least one transmission type and fuel type");
      return;
    }

    try {
      setLoading(true);

      // Only include the required fields in the payload
      const payload = {
        transmissionIds: carData.transmissionIds,
        fuelTypeIds: carData.fuelTypeIds
      };

      // Pass the id from URL params directly to the service method
      await Services.getInstance().updateCarByModel(id, payload);

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

  // ... rest of the component code remains the same ...
};