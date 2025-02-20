import { React, Component } from "react";

let baseURL = "http://localhost:3009";

export class Services extends Component {
  static myInstance = null;

  static getInstance() {
    return new Services();
  }

  async baseURL() {
    return baseURL;
  }

  async addCategoryWithFormData(name, categoryType, image, properties) {
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("categoryType", categoryType);
      formData.append("image", image);
      formData.append("properties", JSON.stringify(properties));
      let response = await fetch(baseURL + "/create/category", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error in API response");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error adding category:", error);
      return { error: error.message };
    }
  }

  async addProductWithFormData(productData, categoryType) {
    try {
      let formData = new FormData();

      // Add common fields
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("status", productData.status);

      // Add fields specific to category type
      if (categoryType === "ecommerce") {
        formData.append("brandId", productData.brand);
        formData.append("skuId", productData.skuid);
        formData.append("quantity", productData.quantity);
      } else if (categoryType === "service") {
        formData.append("videoUrl", productData.videoUrl);
        formData.append("services", JSON.stringify(productData.services)); // Append services field
      }

      // Append category & properties
      formData.append("categoryId", productData.category);
      formData.append("properties", JSON.stringify(productData.properties));

      // Append images correctly
      productData.images.forEach((file, index) => {
        formData.append(`image`, file);
      });

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send request to the server
      let response = await fetch(baseURL + "/create/Product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error in API response");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error adding product:", error);
      return { error: error.message };
    }
  }

  async getCategories() {
    try {
      let response = await fetch(baseURL + "/get/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching categories");
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { error: error.message };
    }
  }

  async getCategoryDetailsWithProperties(categoryId) {
    try {
      // Construct the URL using the provided categoryId
      let response = await fetch(
        `${baseURL}/get/${categoryId}/categoryDetails`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching category details");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching category details:", error);
      return { error: error.message };
    }
  }

  async updateCategory(categoryId) {
    try {
      let response = await fetch(
        `${baseURL}/category/${categoryId}/updateStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error updating category status");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating category status:", error);
      return { error: error.message };
    }
  }

  async getBrands() {
    try {
      let response = await fetch(baseURL + "/get/productBrands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching brands");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching brands:", error);
      return { error: error.message };
    }
  }

  async addBrandWithFormData(name, suitableCategories, image) {
    try {
      let formData = new FormData();

      // Append the brand name
      formData.append("name", name);

      // Append suitable categories as suitablecategories[0], suitablecategories[1], etc.
      suitableCategories.forEach((category, index) => {
        formData.append(`suitablecategories[${index}]`, category);
      });

      // Append the image (make sure it's a File object)
      if (image) {
        formData.append("image", image);
      }

      // Send POST request to the API for adding the brand
      let response = await fetch(baseURL + "/create/productBrand", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error in API response");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error adding brand:", error);
      return { error: error.message };
    }
  }
  async updateBrandStatus(brandId, status) {
    try {
      // Build the URL with the dynamic brandId and status
      let response = await fetch(`${baseURL}/update/${brandId}/brandStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send status in request body
      });

      if (!response.ok) {
        throw new Error("Error updating brand status");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating brand status:", error);
      return { error: error.message };
    }
  }

  async updateCategoryStatus(categoryId, newStatus) {
    try {
      let response = await fetch(
        `${baseURL}/category/${categoryId}/updateStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }), // Send the new status in the request body
        }
      );
  
      if (!response.ok) {
        throw new Error("Error updating category status");
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating category status:", error);
      return { error: error.message };
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      // Create a new FormData object
      const formData = new FormData();
      // Append data to FormData
      formData.append("name", categoryData.name);
      formData.append("categorystatus", categoryData.categorystatus);

      // If there's an image, append that too
      if (categoryData.image) {
        formData.append("image", categoryData.image); // For image, it can be a file or base64 string
      }

      // Make the PATCH request using fetch
      const response = await fetch(
        `${baseURL}/category/${categoryId}/updateCategory`,
        {
          method: "PATCH",
          headers: {},
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error updating category");
      }

      // Parse the JSON response
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating category:", error);
      return { error: error.message }; // Return error message if there is an issue
    }
  }

  async updateCategoryProperty(propertyId, name, description) {
    try {
      // Create an object with the necessary data
      const data = {
        name: name,
        description: description,
      };

      // Log the data object
      console.log("Payload:", data);

      // Make the PATCH request using fetch
      const response = await fetch(
        `${baseURL}/update/${propertyId}/editCategoryProp`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type to application/json
          },
          body: JSON.stringify(data), // Send the data as a JSON string
        }
      );

      if (!response.ok) {
        throw new Error("Error updating category property");
      }

      // Parse the JSON response
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating category property:", error);
      return { error: error.message }; // Return error message if there is an issue
    }
  }

  async updateProductProperty(productId, propertyId, value) {
    try {
      const data = { value };

      console.log("Updating property for Product ID:", productId);
      console.log("Property ID:", propertyId, "New Value:", value);

      const response = await fetch(
        `${baseURL}/productproperty/${productId}/${propertyId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error updating product property:", error);
      return { error: error.message };
    }
  }

  async updateProduct(editProductId, updatedData) {
    try {
      console.log("Updating Product ID:", editProductId);
      console.log("Updated Data:", updatedData);

      const response = await fetch(
        `${baseURL}/update/${editProductId}/product`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error updating product:", error);
      return { error: error.message };
    }
  }

  async productSetPrimaryImg(productId, imageId) {
    try {
      console.log("Setting primary image for Product ID:", productId);
      console.log("Image ID:", imageId);

      const response = await fetch(
        `${baseURL}/product/${productId}/${imageId}/primaryImage`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error setting primary image:", error);
      return { error: error.message };
    }
  }

  async productAddImage(productId, imageFile) {
    try {
      console.log("Adding image for Product ID:", productId);

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(`${baseURL}/product/${productId}/addImage`, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error adding image:", error);
      return { error: error.message };
    }
  }

  async deleteProductImage(imageId) {
    try {
      console.log("Deleting Image ID:", imageId);

      const response = await fetch(`${baseURL}/deleteProductImage/${imageId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error deleting product image:", error);
      return { error: error.message };
    }
  }

  async getBrandCategories(brandId) {
    try {
      let response = await fetch(
        `${baseURL}/get/${brandId}/AssociatedCategories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching brand categories");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching brand categories:", error);
      return { error: error.message };
    }
  }

  async getNonAssociatedCategories(brandId) {
    try {
      let response = await fetch(`${baseURL}/get/${brandId}/NACategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching non-associated categories");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching non-associated categories:", error);
      return { error: error.message };
    }
  }

  async addBrandCategory(brandId, categoryIds) {
    try {
      // Prepare the payload in raw format
      const payload = {
        brandId: brandId, // The brand ID
        categoryIds: categoryIds, // The array of category IDs
      };

      // Send POST request to the API with raw JSON payload
      let response = await fetch(baseURL + "/add/brand/associateCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Convert the payload to JSON format
      });

      if (!response.ok) {
        throw new Error("Error in API response");
      }

      let responseJson = await response.json(); // Parse the JSON response
      return responseJson;
    } catch (error) {
      console.error("Error adding brand:", error);
      return { error: error.message };
    }
  }

  async getProducts() {
    try {
      let response = await fetch(baseURL + "/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching product");
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { error: error.message };
    }
  }

  async getProductById(productId) {
    try {
      let response = await fetch(`${baseURL}/productDetails/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching product details");
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return { error: error.message };
    }
  }

  async getProductBrands(categoryId) {
    try {
      // Construct the URL dynamically with the categoryId
      let response = await fetch(
        `${baseURL}/get/${categoryId}/brandbyCategory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching product brands by category");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { error: error.message };
    }
  }

  async getCategoryProperties(categoryId) {
    try {
      // Construct the URL dynamically with the categoryId
      let response = await fetch(
        `${baseURL}/get/${categoryId}/categoryProperties`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching category properties");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching category properties:", error);
      return { error: error.message };
    }
  }

  async getActiveProductStatus() {
    try {
      // Fetch active product status from the given endpoint
      let response = await fetch(`${baseURL}/fetch/activeproductStatus`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching active product status");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching active product status:", error);
      return { error: error.message };
    }
  }

  async getCarBrands() {
    try {
      let response = await fetch(baseURL + "/brand/getBrands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching car brands");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching car brands:", error);
      return { error: error.message };
    }
  }

  async updateCarBrandStatus(brandId, status) {
    try {
      // Build the URL with the dynamic brandId
      let response = await fetch(`${baseURL}/brand/${brandId}/updateStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send status in request body
      });

      if (!response.ok) {
        throw new Error("Error updating car brand status");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating car brand status:", error);
      return { error: error.message };
    }
  }
  async addCarBrandWithFormData(name, image) {
    try {
      let formData = new FormData();

      // Append the brand name
      formData.append("name", name);

      // Append the image (ensure it's a File object)
      if (image) {
        formData.append("image", image);
      }

      // Send POST request to the API for adding the car brand
      let response = await fetch(`${baseURL}/brand/createBrand`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error adding car brand");
      }

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error adding car brand:", error);
      return { error: error.message };
    }
  }

  async updateBrand(productBrandId, payload, isBrandNameChanged, isBrandImageChanged) {
    try {
      const headers = {};
  
      // Set headers conditionally
      if (!isBrandImageChanged) {
        headers["Content-Type"] = "application/json";
      }
  
      console.log("Updating brand with ID:", productBrandId);
      console.log("Payload:", payload);
  
      const response = await fetch(`${baseURL}/update/${productBrandId}/brand`, {
        method: "PATCH",
        body: isBrandImageChanged ? payload : JSON.stringify({ name: payload.get("name") }),
        headers,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("API Error Response:", errorResponse);
        throw new Error(errorResponse.message || "Error updating brand");
      }
  
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating brand:", error);
      return { error: error.message };
    }
  }
  async updateCarBrand(
    brandId,
    payload,
    isBrandNameChanged,
    isBrandImageChanged
  ) {
    try {
      const response = await fetch(`${baseURL}/updateBrand/${brandId}`, {
        method: "PATCH",
        body: isBrandImageChanged
          ? payload
          : JSON.stringify({ name: payload.get("name") }), // Conditionally send FormData or JSON
        headers: isBrandImageChanged
          ? {}
          : { "Content-Type": "application/json" }, // Set headers conditionally
      });

      if (!response.ok) {
        throw new Error("Error updating car brand");
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating car brand:", error);
      return { error: error.message };
    }
  }

  // Function to fetch brand details (optional)
  async getBrandDetails(brandId) {
    try {
      const response = await fetch(`${baseURL}/brand/${brandId}`);
      if (!response.ok) {
        throw new Error("Error fetching brand details");
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching brand details:", error);
      return { error: error.message };
    }
  }

  // /////////////
  async getCarModels() {
    try {
      let response = await fetch(baseURL + "/model/getmodels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Error fetching car models");
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching car models:", error);
      return { error: error.message };
    }
  }

  async addCarModelWithFormData(brandId, model, carImage) {
    try {
      let formData = new FormData();
      // Append form fields
      formData.append("brandId", brandId); // Use "brandId" instead of "brand"
      formData.append("name", model); // Model name
      if (carImage) {
        formData.append("image", carImage); // Image file
      }
  
      // Send POST request to API
      let response = await fetch(`${baseURL}/model/createModel`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error adding car model: ${response.statusText}`);
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error adding car model:", error);
      return { error: error.message };
    }
  }
  
  async getCarYears() {
    try {
      let response = await fetch(baseURL + "/year/getCarYear", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Error fetching car years");
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching car years:", error);
      return { error: error.message };
    }
  }

  async getCarFuelTypes() {
    try {
      let response = await fetch(baseURL + "/fetch/carFuelTypes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Error fetching car fuel types");
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching car fuel types:", error);
      return { error: error.message };
    }
  }

  async getCarTransmission() {
    try {
      let response = await fetch(baseURL + "/fetch/carTransmission", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Error fetching car transmission");
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching car transmission:", error);
      return { error: error.message };
    }
  }
  
  async addAdminCarWithFormData(formattedData) {
    try {
      // Instead of FormData, we'll send JSON directly since we're sending nested arrays
      const response = await fetch(`${baseURL}/adminCars/Addcar`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
  
      if (!response.ok) {
        throw new Error(`Error adding admin car: ${response.statusText}`);
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error adding admin car:", error);
      return { error: error.message };
    }
  }

  async updateCarModelStatus(adminCarId, status) {
    try {
      // Build the URL with the dynamic adminCarId
      let response = await fetch(`${baseURL}/adminCar/${adminCarId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send status in request body
      });
  
      if (!response.ok) {
        throw new Error("Error updating car model status");
      }
  
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error updating car model status:", error);
      return { error: error.message };
    }
  }
  
  // Update Car Model
// service.js - Updated updateCarModel function
async updateCarModel(modelId, payload, isBrandChanged, isModelChanged, isImageChanged) {
  try {
    let requestBody;
    const headers = {};

    if (isImageChanged) {
      // If image is being updated, use FormData
      requestBody = payload;
      // Don't set Content-Type when sending FormData - browser will set it automatically
    } else {
      // If only text fields are being updated, use JSON
      headers["Content-Type"] = "application/json";
      requestBody = JSON.stringify({
        name: payload.get("name"),
        brandName: payload.get("brandName")
      });
    }

    const response = await fetch(`${baseURL}/${modelId}/updateModel`, {
      method: "PATCH",
      body: requestBody,
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating car model");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating car model:", error);
    return { error: error.message };
  }
}
async getAdminCarByModels(modelId) {
  try {
    let response = await fetch(baseURL + `/adminCar/${modelId}/CarsByModel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching car models");
    }

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error fetching car models:", error);
    return { error: error.message };
  }
}
async updateCarByModel(adminCarId, payload) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Include adminCarId in the payload
    const requestBody = JSON.stringify({
      adminCarId: adminCarId,
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



  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Services;
