import { useEffect, useState } from "react";
import { addTask, listTasks } from "./api";
import "./style.css";

function TodoApp() {
  const [inputTask, setInputTask] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [tasks, setTasks] = useState([]);
  const [userId] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [])

  async function fetchTasks() {
    try {
      const tasks = await listTasks(userId);
      setTasks(tasks);
    } catch(err) {
      setErrorMessage(err);
    }
  }

  function isAddButtonDisabled() {
    return inputTask === "";
  }

  function handleInputTaskChange(e) {
    setInputTask(e.target.value);
  }

  async function handleAddTask() {
    try {
      const task = { userId, name: inputTask };
      const addedTask = await addTask(task);
      setTasks([ addedTask, ...tasks ]);
    } catch(err) {
      setErrorMessage(err);
    }
  }

  function renderTasks() {
    return tasks.map((task, idx) => <li key={idx}>{task.name}</li>);
  }

  return (
    <div className="TodoApp">
      <input
        data-testid="task-input"
        placeholder="Please input task"
        onChange={handleInputTaskChange}
      />
      <button disabled={isAddButtonDisabled()} onClick={handleAddTask}>
        Add Task
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div>Task List</div>
      <ul data-testid="list">{renderTasks()}</ul>
    </div>
  );
}

export default TodoApp;
