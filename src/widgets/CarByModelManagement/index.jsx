import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyledTable from "./styles";
import Empty from "../../components/Empty";
import Pagination from "../../ui/Pagination";
import { useWindowSize } from "react-use";
import usePagination from "../../hooks/usePagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import Services from "../../pages/Services/Services";

const CarByModelManagementTable = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const { modelId } = useParams();
  console.log('fwefe222', modelId);

  const [carModels, setCarModels] = useState([]);
  const pagination = usePagination(carModels, 17);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await Services.getInstance().getAdminCarByModels(modelId);

        if (response.error) {
          throw new Error(response.error);
        }

        const mappedData = response.data.map((model, index) => ({
          id: model.id,
          carYear: model.year.year,
          carYearId: model.year.id, // Include the year ID
          transmission: model.transactionIds.map((t) => t.name).join(", "),
          transmissionIds: model.transactionIds.map((t) => t.id), // Include the transmission IDs
          fuelType: model.fuelTypeIds.map((f) => f.name).join(", "),
          fuelTypeIds: model.fuelTypeIds.map((f) => f.id), // Include the fuel type IDs
          srNo: index + 1,
        }));

        setCarModels(mappedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching car models:", error);
        setError("Failed to fetch car models. Please try again later.");
      }
    };

    fetchCarModels();
  }, [modelId]);

  const handleEditClick = (record) => {
    // Log the data being passed
    console.log("Data being passed to UpdateCarbyModel:", record);

    // Save the car model data to session storage
    sessionStorage.setItem("carModelData", JSON.stringify(record));

    // Navigate to the update page
    navigate(`/adminCar/${record.id}/update`);
  };

  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete this model?`)) {
      const updatedData = carModels.filter((item) => item.id !== record.id);
      setCarModels(updatedData);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 flex-col gap-[22px] mt-4">
        {error && <div className="text-red-500 text-center">{error}</div>}
        {width >= 768 ? (
          <StyledTable
            columns={[
              {
                title: "Sr. No.",
                dataIndex: "srNo",
                key: "srNo",
                align: "center",
              },
              {
                title: "Car Year",
                dataIndex: "carYear",
                key: "carYear",
                align: "center",
              },
              {
                title: "Transmission",
                dataIndex: "transmission",
                key: "transmission",
                align: "center",
              },
              {
                title: "Fuel Type",
                dataIndex: "fuelType",
                key: "fuelType",
                align: "center",
              },
              {
                title: "Actions",
                key: "actions",
                align: "center",
                render: (_, record) => (
                  <div className="flex gap-2 justify-center">
                    <button
                      className="px-3 py-1 text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => handleEditClick(record)}
                    >
                      <FaEdit className="mr-2" />
                    </button>
                    <button
                      className="px-3 py-1 text-red-500 hover:text-red-700 flex items-center"
                      onClick={() => handleDelete(record)}
                    >
                      <FaTrash className="mr-2" />
                    </button>
                  </div>
                ),
              },
            ]}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.id}
            locale={{ emptyText: <Empty text="No car models found" /> }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((item) => (
              <div className="card" key={`carModel-${item.id}`}>
                <h6>Year: {item.carYear}</h6>
                <p>Transmission: {item.transmission}</p>
                <p>Fuel Type: {item.fuelType}</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="px-3 py-1 text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default CarByModelManagementTable;