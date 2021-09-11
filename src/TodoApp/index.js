import './App.css';

function App() {
  return (
    <div className="App">
      <input data-testid="task-input" placeholder="Please input task"/>
      <button>Add Task</button>
      <div className="task-list">

      </div>
    </div>
  );
}

export default App;
