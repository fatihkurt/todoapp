import { useState } from "react";
import { addTask } from "./api";
import "./style.css";

function TodoApp() {
  const [inputTask, setInputTask] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [tasks, setTasks] = useState([]);
  const [userId] = useState(1);

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
    return tasks.map((task) => <div>{task.name}</div>);
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
      <div className="task-list">{renderTasks()}</div>
    </div>
  );
}

export default TodoApp;
