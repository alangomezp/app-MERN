import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../css/TaskList.css";

export default function TasksList() {
  const [taskList, setTaskList] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getTasks = async () => {
    const response = await axios.get("http://localhost:9000/api/tasks");
    setTaskList(() => response.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTaskToUpdate = async (id) => {
    if (!showModal) {
      const response = await axios.get(`http://localhost:9000/api/tasks/${id}`);
      setTaskToUpdate(response.data);
      const container = document.getElementsByClassName("container");
      container.className = "container blurry-background";
      console.log(container);
    }
    setShowModal(!showModal);
  };

  const handleUpdateForm = ({ target }) => {
    const { value, name } = target;

    console.log(`${name}: ${value}`);
    setTaskToUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteTask = (id) => {
    console.log(id);
    Swal.fire({
      title: "You are going to delete this task!",
      text: "Are you sure?",
      icon: "warning",
      confirmButtonText: "Yes",
      confirmButtonColor: "#f44336",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:9000/api/tasks/${id}`
        );
        console.log(response.data);
        getTasks();
        Swal.fire("Deleted", "Task Deleted!", "success");
      }
    });
  };

  const updateTask = async (id) => {
    console.log(id);
    const response = await axios.put(
      `http://localhost:9000/api/tasks/${id}`,
      taskToUpdate
    );
    console.log(response.data);
    getTasks();
    setShowModal(!showModal);
    Swal.fire("Updated", "Task Updated!", "success");
  };

  return (
    <>
      <div className="cards-title">
        <h3>Tasks</h3>
      </div>
      <div className="cards">
        {taskList.length === 0 ? (
          <h1>
            No hay tareas <i className="fas fa-smile-beam"></i>
          </h1>
        ) : (
          taskList.map((item, index) => {
            return (
              <div key={index}>
                <span className="options">
                  <i
                    className="fas fa-edit"
                    onClick={() => {
                      getTaskToUpdate(item._id);
                    }}
                  ></i>
                  <i
                    className="fas fa-trash"
                    onClick={() => {
                      deleteTask(item._id);
                    }}
                  ></i>
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })
        )}
      </div>

      <div className={showModal ? "modal active-modal" : "modal"}>
        <div className="header-modal">
          <h3> Update Task</h3>
          <i
            className="fas fa-window-close close-option"
            onClick={() => {
              setShowModal(!showModal);
            }}
          ></i>
        </div>
        <div className="body-modal">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateTask(taskToUpdate._id);
            }}
          >
            <div>
              <label> New Title:</label>
              <input
                type="text"
                name="title"
                value={taskToUpdate.title || ""}
                onChange={handleUpdateForm}
              />
            </div>
            <div>
              <label> New Description:</label>
              <input
                type="text"
                name="description"
                value={taskToUpdate.description || ""}
                onChange={handleUpdateForm}
              />
            </div>
            <button type="submit">
              Update <i className="fas fa-edit"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
