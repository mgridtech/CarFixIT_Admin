import { React, Component } from "react";

let baseURL = 'http://localhost:3009';

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

      // Append form data fields
      formData.append("name", name);
      formData.append("categoryType", categoryType);
      formData.append("image", image); // If image is valid, append it
      formData.append("properties", JSON.stringify(properties)); // Append properties as JSON string

      // Send the POST request without setting the Content-Type manually
      let response = await fetch(baseURL + "/create/category", {
        method: "POST",
        body: formData, // Browser will set the correct Content-Type automatically
      });

      // Check if response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error("Error in API response");
      }

      let responseJson = await response.json();
      return responseJson; // Return the response JSON from the server
    } catch (error) {
      console.error("Error adding category:", error);
      return { error: error.message }; // Return error message in case of failure
    }
  }

  async getCategories() {
    try {
      // Send a GET request to fetch categories
      let response = await fetch(baseURL + "/get/categories", {
        method: "GET", // No body required for GET request
        headers: {
          "Content-Type": "application/json", // Optional, depending on your server
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Error fetching categories");
      }

      // Parse and return the response JSON
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { error: error.message }; // Return error message in case of failure
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