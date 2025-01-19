import React, { useState, useEffect } from "react";
import "./Books.module.css";
import * as XLSX from 'xlsx';
import axios from "axios";
const UserForm = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    JobId: "",
    DepartmentId: "",
    MobileNumber: "",
    DateOfBirth: "",
    Address: "",
    Email: "",
    Password: "",
    age: "",
    PhotoUrl: "",
    Image: null,
  });
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store input value
  const [searsh, SetsearshData] = useState(null);
  useEffect(() => {
    // Fetch departments, jobs, and books
    fetch("https://localhost:7164/api/Department")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));

    fetch("https://localhost:7164/api/Job")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));

    fetch("https://localhost:7164/api/Book")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
    console.log(books);
    console.log(books);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const form = new FormData();
    for (const key in formData) {
      if (key === "Image" && formData[key]) {
        form.append("Image", formData[key]);
      } else {
        form.append(key, formData[key]);
      }
    }
    console.log(form)
    console.log(formData)
    const url = editMode
      ? `https://localhost:7164/api/Book/${editId}`
      : "https://localhost:7164/api/Book/CreateBook";

    fetch(url, {
      method: editMode ? "PUT" : "POST",
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("ddffffffff");
          console.log(formData);
          console.log(form);
          throw new Error("Network response was not ok");

        }
        console.log("dddddddddddddddddd");
        //////// location.reload();
        return response.json();
        //ahmed abdo 
      })
      .then((data) => {
        if (editMode) {
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === editId ? data : book))
          );
          setEditMode(false);
          setEditId(null);
        } else {
          setBooks((prevBooks) => [...prevBooks, data]);
        }
        setFormData({
          FullName: "",
          JobId: "",
          DepartmentId: "",
          MobileNumber: "",
          DateOfBirth: "",
          Address: "",
          Email: "",
          Password: "",
          age: "",
          PhotoUrl: "",
          Image: null,
        });

      })
      .catch((error) => console.error("Error:", error));


    fetch("https://localhost:7164/api/Book")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
    console.log(books);


  };

  const handleEdit = (book) => {
    setFormData({
      FullName: book.fullName,
      JobId: book.jobId,
      DepartmentId: book.departmentId,
      MobileNumber: book.mobileNumber,
      DateOfBirth: book.dateOfBirth,
      Address: book.address,
      Email: book.email,
      Password: book.password,
      age: book.age,
      PhotoUrl: book.photoUrl,
      Image: null, // File uploads can't be pre-filled
    });
    setEditId(book.id);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`https://localhost:7164/api/Book?Id=${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete");
          }
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
          fetch("https://localhost:7164/api/Book")
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error("Error fetching books:", error));

        })
        .catch((error) => console.error("Error deleting record:", error));
    }
  };


  const Search = async () => {
    try {
      // Fetch filtered books based on the search query
      const res = await axios.get(`https://localhost:7164/api/Book/SearchForBooks?bookName=${searchQuery}`);

      // Check if the response has data
      if (res.data) {
        console.log(res.data);
        setBooks(res.data); // Store filtered books in books state
      }
    } catch (error) {
      console.error("Error fetching filtered books:", error);
    }
  };


  const handleInputChange = async (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value); // Update state with input value
  };



  const exportToExcel = () => {
    // Create a new worksheet from the data
    const ws = XLSX.utils.json_to_sheet(books);
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '3PillarsSheet');
    // Write the workbook to a file and trigger download
    XLSX.writeFile(wb, 'data.xlsx');
};


  return (
    <div>
      <div>
        <button onClick={exportToExcel} className="btn btn-success">
          Export to Excel
        </button>
      </div>



      <div>
        <label htmlFor="search">Search By Book Name</label>
        <input
          id="search"
          value={searchQuery}
          type="text"
          onChange={handleInputChange} // Update state on input change
        />
        <button onClick={Search}>Search</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job:</label>
          <select
            name="JobId"
            value={formData.JobId}
            onChange={handleChange}
            required
          >
            <option value="">Select Job</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.jobName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Department:</label>
          <select
            name="DepartmentId"
            value={formData.DepartmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="MobileNumber"
            value={formData.MobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="DateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input className="text-success"
            type="file"
            name="Image"
            onChange={handleFileChange}
            required={!editMode}
          />
        </div>
        <button type="submit">{editMode ? "Update" : "Submit"}</button>
      </form>
      {/* Grid/Table */}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Job</th>
            <th>Department</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.fullName}</td>
              <td>{book.job["jobName"]}</td>
              <td>{book.department["departmentName"]}</td>
              <td>{book.mobileNumber}</td>
              <td>{book.dateOfBirth}</td>
              <td>{book.address}</td>
              <td>{book.email}</td>
              <td>{book.age}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserForm;
