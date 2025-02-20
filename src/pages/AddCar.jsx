// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageHeader from "../layout/PageHeader";
// import Spring from "../components/Spring";

// const AddCar = () => {
//   const navigate = useNavigate();

//   // State for car data
//   const [carData, setCarData] = useState({
//     brand: "",
//     model: "",
//     selectedYears: [],
//     carImage: null, // Added for image upload
//   });

//   // State for validation errors
//   const [errors, setErrors] = useState({
//     brand: "",
//     model: "",
//     selectedYears: "",
//     carImage: "", // Added for image validation
//   });

//   // Generate the last 30 years for the year selection
//   const [availableYears] = useState(
//     Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
//   );

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCarData({ ...carData, [name]: value });
//     setErrors({ ...errors, [name]: "" }); // Clear error when input changes
//   };

//   // Handle year selection
//   const handleToggleYear = (year) => {
//     setCarData((prev) => ({
//       ...prev,
//       selectedYears: prev.selectedYears.includes(year)
//         ? prev.selectedYears.filter((y) => y !== year) // Remove year if already selected
//         : [...prev.selectedYears, year], // Add year if not selected
//     }));
//     setErrors({ ...errors, selectedYears: "" }); // Clear error when a year is selected
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCarData({ ...carData, carImage: file }); // Store the file in state
//       setErrors({ ...errors, carImage: "" }); // Clear image error
//     }
//   };

//   // Handle image removal
//   const handleImageRemove = () => {
//     setCarData({ ...carData, carImage: null });
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = { brand: "", model: "", selectedYears: "", carImage: "" };

//     if (!carData.brand) {
//       newErrors.brand = "Brand is required.";
//     }
//     if (!carData.model) {
//       newErrors.model = "Model is required.";
//     }
//     if (carData.selectedYears.length === 0) {
//       newErrors.selectedYears = "Please select at least one year.";
//     }
//     if (!carData.carImage) {
//       newErrors.carImage = "Car image is required.";
//     }

//     setErrors(newErrors);
//     return Object.values(newErrors).every((error) => !error); // Return true if no errors
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Simulate saving data (replace with API call)
//       console.log("Car Data Saved:", carData);
//       alert("Car data saved successfully!");
//       navigate("/car-model-management"); // Redirect to car management page
//     } else {
//       alert("Please fix the errors before submitting.");
//     }
//   };

//   return (
//     <>
//       <PageHeader title="Add Car" />

//       <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
//         <Spring
//           className="w-full max-w-[560px]"
//           type="slideUp"
//           duration={400}
//           delay={300}
//         >
//           <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
//             {/* Brand Dropdown */}
//             <div className="field-wrapper">
//               <label htmlFor="brand" className="field-label">
//                 Brand<span className="text-red-500">*</span>
//               </label>
//               <select
//                 className={`field-input ${errors.brand ? "border-red-500" : ""}`}
//                 id="brand"
//                 name="brand"
//                 value={carData.brand}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Brand</option>
//                 <option value="Toyota">Toyota</option>
//                 <option value="Honda">Honda</option>
//                 <option value="Ford">Ford</option>
//                 <option value="BMW">BMW</option>
//                 <option value="Mercedes">Mercedes</option>
//               </select>
//               {errors.brand && (
//                 <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
//               )}
//             </div>

//             {/* Model Input */}
//             <div className="field-wrapper">
//               <label htmlFor="model" className="field-label">
//                 Model<span className="text-red-500">*</span>
//               </label>
//               <input
//                 className={`field-input ${errors.model ? "border-red-500" : ""}`}
//                 id="model"
//                 name="model"
//                 type="text"
//                 placeholder="Car model"
//                 value={carData.model}
//                 onChange={handleInputChange}
//               />
//               {errors.model && (
//                 <p className="text-red-500 text-sm mt-1">{errors.model}</p>
//               )}
//             </div>

//             {/* Car Image Upload */}
//             <div className="field-wrapper">
//               <label className="field-label">
//                 Car Image<span className="text-red-500">*</span>
//               </label>
//               <div className="image-upload-wrapper relative w-full h-48 border-dashed border-2 border-primary flex items-center justify-center cursor-pointer">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   onChange={handleImageUpload}
//                 />
//                 {carData.carImage ? (
//                   <div className="relative h-full w-full">
//                     <img
//                       src={URL.createObjectURL(carData.carImage)} // Display image preview
//                       alt="Car Preview"
//                       className="h-full w-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
//                       onClick={handleImageRemove}
//                     >
//                       &#10005;
//                     </button>
//                   </div>
//                 ) : (
//                   <span className="text-gray-500">Click to upload an image</span>
//                 )}
//               </div>
//               {errors.carImage && (
//                 <p className="text-red-500 text-sm mt-1">{errors.carImage}</p>
//               )}
//             </div>

//             {/* Year Selection with Checkboxes */}
//             <div className="field-wrapper">
//               <label htmlFor="years" className="field-label">
//                 Years<span className="text-red-500">*</span>
//               </label>
//               <div
//               className="overflow-y-auto max-h-[200px]"
//               >
//                 {availableYears.map((year, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id={`year-${year}`}
//                       value={year}
//                       checked={carData.selectedYears.includes(year)}
//                       onChange={() => handleToggleYear(year)}
//                     />
//                     <label htmlFor={`year-${year}`}>{year}</label>
//                   </div>
//                 ))}
//               </div>
//               {errors.selectedYears && (
//                 <p className="text-red-500 text-sm mt-1">{errors.selectedYears}</p>
//               )}
//             </div>

//             {/* Display Added Years */}
//             {carData.selectedYears.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-bold mb-2">Selected Years:</h3>
//                 <ul className="flex flex-wrap gap-2">
//                   {carData.selectedYears.map((year, index) => (
//                     <li
//                       key={index}
//                       className="bg-gray-200 text-sm px-3 py-1 rounded-lg flex items-center gap-2"
//                     >
//                       {year}
//                       <button
//                         type="button"
//                         className="text-red-500"
//                         onClick={() => handleToggleYear(year)}
//                       >
//                         ✕
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Save Button */}
//             <div className="flex justify-center gap-5 mt-6">
//               <button type="submit" className="btn btn--primary w-full">
//                 Save Car Model
//               </button>
//             </div>
//           </form>
//         </Spring>
//       </div>
//     </>
//   );
// };

// export default AddCar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import AddCarForm1 from "../components/AddCarForm1";
import AddCarForm2 from "../components/AddCarForm2";

const AddCar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    carImage: null,
    selectedYears: [],
  });

  const handleNext = (data) => {
    setCarData({ ...carData, ...data });
    setStep(2);
  };

  const handleSave = (data) => {
    setCarData({ ...carData, ...data });
    console.log("Car Data Saved:", carData);
    alert("Car data saved successfully!");
    navigate("/car-model-management");
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
          {step === 1 && <AddCarForm1 onNext={handleNext} />}
          {step === 2 && (
            <AddCarForm2 carData={carData} onSave={handleSave} />
          )}
        </Spring>
      </div>
    </>
  );
};

export default AddCar;