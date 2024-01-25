import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import "./App.css";
import axios from "axios";
import Forms from "./Components/Forms";
import { API_URL } from "./Globle";

const App = () => {
  let [addtask, setAddtask] = useState(false);
  let [tasksedit, setTasksedit] = useState(false);
  let [task, setTask] = useState({
    name: "",
    email: "",
    phone: "",
  });
  let [edittask, setEdittask] = useState({
    name: "",
    email: "",
    phone: "",
    id: "",
  });
  let [fetch, setFetch] = useState([]);

  const handleonchange = (e) => {
    let { name, value } = e.target;
    setTask((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fetch_data_post = await axios.post(`${API_URL}/post`, task);
      if (fetch_data_post.data.status) {
        setAddtask(false);
        fetch_Data();
        // Reset the task state
        setTask({
          name: "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  

  const fetch_Data = async () => {
    try {
      let fetch_data = await axios.get(`${API_URL}/get`);
      if (fetch_data.data.status) {
        setFetch(fetch_data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch_Data();
  }, []);

  const update_data = async () => {
    try {
      const updatedata = {
        id: edittask.id,
        name: edittask.name,
        email: edittask.email,
        phone: edittask.phone,
      };
      const response = await axios.put(`${API_URL}/user`, {
        id: edittask.id,
        ...updatedata,
      });
  
      if (response.data.status) {
        console.log("Update successful:", response.data);
        setTasksedit(false);
        // Reset the edittask state
        setEdittask({
          name: "",
          email: "",
          phone: "",
          id: "",
        });
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  
  const handleeditonchange = (e) => {
    let { name, value } = e.target;
    setEdittask((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleedit = (item) => {
    console.log("handleedit function called");
    setEdittask(item);
    setTasksedit(true);
  };

  const delete_data = async (id) => {
    try {
      let delete_data = await axios.delete(`${API_URL}/delete/` + id);
      if (delete_data.data.status) {
        fetch_Data();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      {addtask && (
        <Forms
          handleSubmit={handleSubmit}
          handleonchange={handleonchange}
          closehandle={() => setAddtask(false)}
          rest={task}
        />
      )}
      {tasksedit && (
        <Forms
        handleSubmit={update_data}

          handleonchange={handleeditonchange}
          closehandle={() => setTasksedit(false)}
          rest={edittask}
          id={edittask.id}
        />
      )}
      <div className="container-box">
        <div className="box">
          <div className="add-btn">
            <Link to="#" onClick={() => setAddtask(true)}>
              <FaPlus /> Add Task
            </Link>
          </div>
          
          <table className="table">
            <thead className="thead">
              <tr className="thead-row">
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {fetch.length === 0 ? (
                <tr>
                  <td colSpan="4" className="paragraph">
                    No Data Available
                  </td>
                </tr>
              ) : (
                fetch.map((item, index) => (
                  <tr key={index} className="tbody-row">
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td className="buttons">
                      <Link
                        to="#"
                        className="edit"
                        onClick={() => handleedit(item)}
                      >
                         <span className="icons">EDIT</span><CiEdit />
                      </Link>
                      <Link
                        to="#"
                        className="delete"
                        onClick={() => delete_data(item._id)}
                      >
                        <span className="icons">DELETE</span><MdDelete />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
