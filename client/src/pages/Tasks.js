import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/Tasks.css";

export default function Tasks() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const body = { title, description };
    await axios
      .post("http://localhost:9000/api/tasks", body, {
        "Content-Type": "application/json",
      })
      .then(() => {
        setTitle("");
        setDescription("");
        Swal.fire("Created", "Task Created!", "success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-form">
      <form onSubmit={handleOnSubmit}>
        <h3>Create New Task</h3>
        <div>
          <label>Task Title:</label>
          <input
            type="text"
            value={title || ""}
            placeholder="Title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          <label>Task Description:</label>
          <input
            type="text"
            value={description || ""}
            placeholder="Description"
            onChange={({ target }) => {
              setDescription(target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Send </button>
        </div>
      </form>
    </div>
  );
}
