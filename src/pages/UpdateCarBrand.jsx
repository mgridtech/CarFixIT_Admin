import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";

const UpdateCarBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the car brand ID from the URL
  const location = useLocation(); // Access the passed state

  // Initialize car brand data with the passed state or default values
  const [carBrand, setCarBrand] = useState(
    location.state?.carBrand || {
      brandName: "",
      brandLogo: "", // Use `brandLogo` instead of `brandImage`
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch car brand data by ID if not passed via state (optional)
  useEffect(() => {
    if (!location.state?.carBrand) {
      const fetchCarBrand = async () => {
        try {
          // Replace this with your API call
          const response = await fetch(`/api/car-brands/${id}`);
          const data = await response.json();
          setCarBrand(data);
        } catch (error) {
          console.error("Error fetching car brand data:", error);
        }
      };

      fetchCarBrand();
    }
  }, [id, location.state?.carBrand]);

  // Handle input changes
  const handleInputChange = (e) => {
    setCarBrand({ ...carBrand, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCarBrand((prev) => ({ ...prev, brandLogo: reader.result })); // Use `brandLogo`
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setCarBrand((prev) => ({ ...prev, brandLogo: null })); // Use `brandLogo`
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the brand name has changed
    const isBrandNameChanged = carBrand.brandName !== location.state?.carBrand?.brandName;

    // Check if the brand image has changed
    const isBrandImageChanged = carBrand.brandLogo !== location.state?.carBrand?.brandLogo;

    // Prepare the payload based on what has changed
    const payload = new FormData();

    if (isBrandNameChanged) {
      payload.append("name", carBrand.brandName);
    }

    if (isBrandImageChanged) {
      // If the image has changed, append the new image to the payload
      const imageFile = await fetch(carBrand.brandLogo).then((res) => res.blob());
      payload.append("image", imageFile, "brand-logo.png");
    }

    try {
      setLoading(true);
      const response = await Services.getInstance().updateCarBrand(
        id, // Use the `id` from useParams
        payload,
        isBrandNameChanged, // Pass a flag to indicate if the name has changed
        isBrandImageChanged // Pass a flag to indicate if the image has changed
      );

      if (response.error) {
        setError(response.error);
      } else {
  

        // Navigate to car brand management page after success
        setTimeout(() => {
                // Show success toast message
        toast.success("Car brand updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
          navigate("/car-brand-management");
        }, 3000); // Delay navigation to allow toast to display
      }
    } catch (error) {
      setError("Failed to update brand");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Update Car Brand" />
      <ToastContainer /> {/* Add this line to include the toast container */}

      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring className="w-full max-w-[560px]" type="slideUp" duration={400} delay={300}>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            {/* Brand Name */}
            <div className="field-wrapper">
              <label className="field-label">Brand Name</label>
              <input
                className="field-input"
                type="text"
                name="brandName"
                value={carBrand.brandName}
                onChange={handleInputChange}
              />
            </div>

            {/* Brand Image Upload */}
            <div className="field-wrapper">
              <label htmlFor="image" className="field-label">
                Brand Image
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={carBrand.brandLogo || "https://via.placeholder.com/150"} // Use `brandLogo`
                  alt="Brand"
                  className="w-16 h-16 rounded border"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-input-border rounded px-4 py-2"
                />
                {carBrand.brandLogo && ( // Use `brandLogo`
                  <button
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={handleImageRemove}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn--primary w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Car Brand"}
            </button>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateCarBrand;