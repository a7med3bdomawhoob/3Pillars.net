import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
const FormWithGrid = () => {
    const [formData, setFormData] = useState({ departmentName: "" });
    const [dataGrid, setDataGrid] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // Fetch data when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:7164/api/Department");
                console.log(response);
                setDataGrid(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again.");
            }
        };
        fetchData();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.departmentName.trim()) {
            alert("Department name is required!");
            return;
        }

        try {
            if (editingId) {
                console.log(editingId);
                console.log(formData);
                // Update existing entry
                await axios.put(`https://localhost:7164/api/Department?id=${editingId}`, { departmentName: formData["departmentName"], id: editingId });
                // Fetch updated data from API
                const response = await axios.get("https://localhost:7164/api/Department");
                setDataGrid(response.data);

                setEditingId(null);
            } else {
                // Add new entry
                await axios.post("https://localhost:7164/api/Department", formData);

                // Fetch updated data from API
                const response = await axios.get("https://localhost:7164/api/Department");
                setDataGrid(response.data);
            }

            // Clear form and close modal
            setFormData({ departmentName: "" });
            setShowModal(false);
        } catch (error) {
            console.error("Error occurred while saving:", error);
            alert("Failed to save the data. Please try again.");
        }
    };
    // Handle edit action
    const handleEdit = (id) => {
        const itemToEdit = dataGrid.find((item) => item.id === id);
        setFormData({ departmentName: itemToEdit.departmentName });
        setEditingId(id);
        setShowModal(true); // Open modal
    };
    // Handle delete action
    const handleDelete = async (id) => {
        // Show confirmation popup
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) {
            return; // Exit if the user cancels the deletion
        }
        try {
            console.log("Deleting ID:", id);
            await axios.delete(`https://localhost:7164/api/Department/DeleteDepartmentByDepartmentId?Id=${id}`);

            // Fetch updated data from API
            const response = await axios.get("https://localhost:7164/api/Department");
            setDataGrid(response.data);
            alert("Item deleted successfully.");
        } catch (error) {
            console.error("Error occurred while deleting:", error);
            alert("Failed to delete the data. Please try again.");
        }
    };
    // Handle modal close
    const handleClose = () => {
        setShowModal(false);
        setFormData({ departmentName: "" });
        setEditingId(null);
    };
    
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Department Form</h2>

            {/* Grid Section */}
            <h3 className="text-center mb-3"><i className="fas  fa-horse"></i></h3>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataGrid.map((item) => (
                        <tr key={item.id}>
                            <td className="bg-info">{item.id}</td>
                            <td className="bg-info">{item.departmentName}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(item.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Section */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? "Edit Entry" : "Add Entry"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="departmentName" className="form-label text-info">Department Name:</label>
                            <input
                                type="text"
                                id="departmentName"
                                name="departmentName"
                                value={formData.departmentName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            {editingId ? "Update" : "Add"}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Add Button */}
            <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
                Add New Entry
            </button>
        </div>
    );
};

export default FormWithGrid;
