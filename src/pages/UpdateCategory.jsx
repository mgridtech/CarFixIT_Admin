import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import Spring from "../components/Spring";
import Services from "./Services/Services";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    image: "",
    categoryStatus: "",
    categoryType: "",
  });
  const [properties, setProperties] = useState([]); // To store the properties from API response
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editedProperty, setEditedProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const { data } = await Services.getInstance().getCategoryDetailsWithProperties(id);
        // Check if data is received properly
        console.log(data); // Log this to inspect the response

        // Assuming the response contains categoryDetails and properties
        const { categoryDetails, properties } = data;

        // Update categoryData with the fetched categoryDetails
        setCategoryData({
          id: categoryDetails.id,
          name: categoryDetails.name,
          image: categoryDetails.image_data || "", // Handle image if base64 string is returned
          categoryStatus: categoryDetails.categoryStatus,
        });

        console.log(categoryData.image);
        

        // Set properties with fetched properties
        setProperties(properties || []); 
      } catch (error) {
        setError("Failed to fetch category details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]); // Trigger effect only on 'id' change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Update the categoryData state with the new image file
    setCategoryData((prev) => ({
      ...prev,
      image: file, // Store the image file in the state
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare category data to send
    const updatedCategoryData = {
      name: categoryData.name,
      categorystatus: categoryData.categoryStatus,
    };
  
    // Only add the image to the payload if it's a File object
    if (categoryData.image instanceof File) {
      updatedCategoryData.image = categoryData.image;
    }
  
    try {
      setLoading(true);
      const response = await Services.getInstance().updateCategory(id, updatedCategoryData);
  
      if (response.error) {
        // Handle the error if update failed
        setError(response.error);
      } else {
        // Handle success (e.g., show success message or redirect)
        navigate("/category-management");
      }
    } catch (error) {
      setError("Failed to update category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleEditProperty = (property) => {
    setEditingPropertyId(property.id);
    setEditedProperty({ ...property });
  };
  

  const handlePropertyChange = (e, field) => {
    setEditedProperty((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveProperty = async (id) => {
    try {
      // Call API to update category property
      const response = await Services.getInstance().updateCategoryProperty(id, editedProperty.name, editedProperty.description);
      
      // If the API response is successful, update the local properties
      if (response.error) {
        setError(response.error); // Show error if update failed
      } else {
        setProperties((prev) =>
          prev.map((property) =>
            property.id === id ? { ...editedProperty } : property
          )
        );
        setEditingPropertyId(null); // Close the edit mode
      }
    } catch (error) {
      setError("Failed to update property");
      console.error(error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditingPropertyId(null);
    setEditedProperty({});
  };

  return (
    <>
      <PageHeader title="Update Category" />
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring className="w-full max-w-[560px]" type="slideUp" duration={400} delay={300}>
          <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Category </h2>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div className="field-wrapper">
              <label htmlFor="name" className="field-label">Category Name</label>
              <input
                className="field-input"
                required
                id="name"
                type="text"
                placeholder="Enter category name"
                value={categoryData.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="field-wrapper">
              <label htmlFor="categoryStatus" className="field-label">Category Status</label>
              <input
                className="field-input"
                id="categoryStatus"
                type="text"
                placeholder="Enter category status"
                value={categoryData.categoryStatus}
                onChange={handleInputChange}
                name="categoryStatus"
              />
            </div>

           <div className="field-wrapper">
              <label htmlFor="image" className="field-label">Category Image</label>
              <div className="flex items-center gap-4">
                <img
                  src={categoryData.image ? `data:image/jpeg;base64,${categoryData.image}` : "https://via.placeholder.com/150"}
                  alt="Category"
                  className="w-16 h-16 rounded border"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-input-border rounded px-4 py-2"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button type="submit" className="btn btn--primary w-full">Update Category</button>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Category Properties</h2>
            <table className="w-full border-collapse border border-gray-300 mt-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Description</th>
                  {/* <th className="border border-gray-300 p-2">Data Type</th> */}
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              
              <tbody>
                {properties.length > 0 ? (
                  properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">{property.id}</td>
                      <td className="border border-gray-300 p-3">
                        {editingPropertyId === property.id ? (
                          <input
                            type="text"
                            className="border border-gray-300 p-1 w-full rounded-md"
                            value={editedProperty.name || ""}
                            onChange={(e) => handlePropertyChange(e, "name")}
                          />
                        ) : (
                          property.name
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editingPropertyId === property.id ? (
                          <input
                            type="text"
                            className="border border-gray-300 p-1 w-full"
                            value={editedProperty.description || ""}
                            onChange={(e) => handlePropertyChange(e, "description")}
                          />
                        ) : (
                          property.description
                        )}
                      </td>
 
                      <td className="border border-gray-300 p-2">
                      {editingPropertyId === property.id ? (
                        <>
                          <button
                            type="button" // Prevents form submission
                            className="text-green-600 hover:underline mr-2"
                            onClick={() => handleSaveProperty(property.id)} // Pass property ID
                          >
                            Save
                          </button>
                          <button
                            type="button" // Prevents form submission
                            className="text-red-600 hover:underline"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button" // Prevents form submission
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEditProperty(property)} // Pass the property to be edited
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border border-gray-300 p-2 text-center">No properties available</td>
                  </tr>
                )}
              </tbody>
            </table>

           
          </form>
        </Spring>
      </div>
    </>
  );
};

export default UpdateCategory;
