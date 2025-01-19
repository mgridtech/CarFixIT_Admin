import { useState, useEffect } from "react";
import { getDiscountsColumnDefs } from "../../constants/columnDefs";
import StyledTable from "./styles"; // Import the styled table
import { discountUpdate, postDataWithRef,discountreset } from "../../db/databaseFunction";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function DiscountTable() {
  const { discountData } = useSelector((state) => state.project);
  const [data, setData] = useState(discountData);
  const [editingRowId, setEditingRowId] = useState(null); // State to track the row being edited
  const [editableData, setEditableData] = useState({});
  

  const handleEditClick = (record) => {
    const recordId = record.id || record.dbId; // Use the correct unique identifier

    console.log("Entering edit mode for row ID:", record.id); // Log the editing row ID
    console.log("Editable data:", record); // Log the editable data for the row
  
    setEditingRowId(recordId);
    setEditableData({ ...record });
  };
  

  const handleSave = () => {
    console.log("Saving row ID:", editingRowId); // Log the row ID being saved
    console.log("Data being saved:", editableData); // Log the data that will be saved
  
    const { id, dbId, ...editableDataWithoutId } = editableData;
  
    // Validation for Percentage and Amount types
    if (editableDataWithoutId.type === "Percentage") {
      if (editableDataWithoutId.value <= 0 || editableDataWithoutId.value >= 100) {
        toast.error("Percentage value must be between 0 and 100.");
        return;
      }
    } else if (editableDataWithoutId.type === "Amount") {
      if (editableDataWithoutId.value <= 0) {
        toast.error("Amount value must be greater than 0.");
        return;
      }
    }
  
    // Update local state
    setData((prevData) =>
      prevData.map((item) =>
        (item.id === editingRowId || item.dbId === editingRowId) ? { ...item, ...editableDataWithoutId } : item
      )
    );
  
    // Update the database
    const dbIdToUse = editableData.dbId || id;
    postDataWithRef("discount", dbIdToUse, editableDataWithoutId);
    discountUpdate(
      dbId,
      editableDataWithoutId.type,
      editableDataWithoutId.value
    );
  
    setEditingRowId(null); // Exit edit mode after saving
  };
  
  
  

  const handleCancel = () => {
    console.log("Canceling edit mode for row ID:", editingRowId); // Log the ID of the row where editing is canceled
  
    setEditingRowId(null); // Exit edit mode without saving
  };
  

  const handleChange = (e, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: e.target.value,
    });
  };

  const handleSelectChange = (value, fieldName) => {
    setEditableData({
      ...editableData,
      [fieldName]: value,
    });
  };

  const handleStatusToggle = (record, checked) => {
    console.log("Toggled record:", record, "New status:", checked);
  
    const updatedItem = {
      ...record,
      status: checked,
    };
  
    // Determine the correct dbId to use
    const dbIdToUse =
      editingRowId === record.id ? editableData.dbId : record.dbId;
    console.log("dbIdToUse:", dbIdToUse);
  
    // Prepare the data without the dbId
    const updatedItemWithoutDbId = { ...updatedItem };
    delete updatedItemWithoutDbId.dbId;
  
    console.log(updatedItemWithoutDbId);
  
    postDataWithRef("discount", dbIdToUse, updatedItemWithoutDbId);
  
    // If the status is toggled to false, call discountreset
    if (!checked) {
      discountreset(dbIdToUse, "discountPrice", 0);
    }
    // If the status is toggled to true, call discountUpdate
    else {
      discountUpdate(dbIdToUse, updatedItem.type, updatedItem.value);
    }
  
    // Update the local data state
    setData((prevData) =>
      prevData.map((item) => (item.dbId === dbIdToUse ? updatedItem : item))
    );
  };

  const columnDefs = getDiscountsColumnDefs({
    handleStatusToggle,
    handleEditClick,
    handleSave,
    handleCancel,
    editingRowId,
    editableData,
    handleChange,
    handleSelectChange,
  });

  useEffect(() => {
    console.log("Updated data:", data);
    console.log("Current editingRowId:", editingRowId); // Log the current editingRowId
  }, [data, editingRowId]);
  

  return (
    <StyledTable
      columns={columnDefs}
      dataSource={data}
      rowKey="dbId"
      pagination={false}
    />
  );
}

export default DiscountTable;
